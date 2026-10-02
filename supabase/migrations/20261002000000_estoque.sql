-- Controle de estoque da Coffee Body: grão verde, grão torrado, pacotes,
-- etiquetas e embalagens. Acesso restrito aos e-mails cadastrados em `donos`.
--
-- O banco guarda MOVIMENTOS (entrada de lote, torra, empacotamento, venda,
-- ajuste). Os saldos nunca são digitados: saem das views `saldo_*`.
-- Pesos em kg com 3 casas, valores sempre em CENTAVOS (inteiros).

-- ---------------------------------------------------------------- acesso

create table donos (
  email text primary key check (email = lower(email))
);

create function eh_dono() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from donos where email = lower(auth.jwt() ->> 'email'));
$$;

-- ---------------------------------------------------------------- cadastro

create table cafes (
  id bigint generated always as identity primary key,
  -- mesmo slug de site/data/products.ts, para ligar estoque e catálogo
  slug text not null unique,
  nome text not null,
  ativo boolean not null default true
);

create domain peso_pacote as text check (value in ('250g', '500g', '1kg'));

create function peso_kg(p peso_pacote) returns numeric
language sql immutable as $$
  select case p when '250g' then 0.25 when '500g' then 0.5 when '1kg' then 1 end::numeric;
$$;

create domain motivo_ajuste as text check (value in ('perda', 'consumo_interno', 'ajuste'));

-- ---------------------------------------------------------------- grão verde

create table lotes_verde (
  id bigint generated always as identity primary key,
  cafe_id bigint not null references cafes,
  fornecedor text,
  kg numeric(10, 3) not null check (kg > 0),
  custo_centavos integer check (custo_centavos >= 0),
  recebido_em date not null default current_date,
  observacao text
);

-- kg positivo soma ao saldo, negativo tira (perda, acerto de contagem).
create table ajustes_verde (
  id bigint generated always as identity primary key,
  lote_verde_id bigint not null references lotes_verde,
  kg numeric(10, 3) not null check (kg <> 0),
  motivo motivo_ajuste not null,
  feito_em date not null default current_date,
  observacao text
);

-- ---------------------------------------------------------------- torra

create table torras (
  id bigint generated always as identity primary key,
  lote_verde_id bigint not null references lotes_verde,
  kg_verde numeric(10, 3) not null check (kg_verde > 0),
  kg_torrado numeric(10, 3) not null check (kg_torrado > 0),
  torrado_em date not null default current_date,
  observacao text,
  check (kg_torrado <= kg_verde)
);

create table ajustes_torrado (
  id bigint generated always as identity primary key,
  torra_id bigint not null references torras,
  kg numeric(10, 3) not null check (kg <> 0),
  motivo motivo_ajuste not null,
  feito_em date not null default current_date,
  observacao text
);

-- ---------------------------------------------------------------- pacotes

-- Cada pacote feito consome grão torrado da torra, 1 embalagem do tamanho
-- e 1 etiqueta do café. A etiqueta é a mesma para qualquer tamanho.
create table empacotamentos (
  id bigint generated always as identity primary key,
  torra_id bigint not null references torras,
  peso peso_pacote not null,
  quantidade integer not null check (quantidade > 0),
  empacotado_em date not null default current_date
);

create table vendas (
  id bigint generated always as identity primary key,
  cafe_id bigint not null references cafes,
  peso peso_pacote not null,
  quantidade integer not null check (quantidade > 0),
  canal text not null check (canal in ('balcao', 'whatsapp', 'atacado', 'clube')),
  valor_centavos integer not null check (valor_centavos >= 0),
  vendido_em date not null default current_date,
  observacao text
);

create table ajustes_pacote (
  id bigint generated always as identity primary key,
  cafe_id bigint not null references cafes,
  peso peso_pacote not null,
  quantidade integer not null check (quantidade <> 0),
  motivo motivo_ajuste not null,
  feito_em date not null default current_date,
  observacao text
);

-- ---------------------------------------------------------------- insumos

-- quantidade positiva = compra/entrada, negativa = perda ou acerto.
-- O consumo no empacotamento NÃO é lançado aqui, é descontado nas views.
create table etiquetas_mov (
  id bigint generated always as identity primary key,
  cafe_id bigint not null references cafes,
  quantidade integer not null check (quantidade <> 0),
  motivo text not null check (motivo in ('compra', 'perda', 'ajuste')),
  feito_em date not null default current_date,
  observacao text
);

create table embalagens_mov (
  id bigint generated always as identity primary key,
  peso peso_pacote not null,
  quantidade integer not null check (quantidade <> 0),
  motivo text not null check (motivo in ('compra', 'perda', 'ajuste')),
  feito_em date not null default current_date,
  observacao text
);

create index on lotes_verde (cafe_id);
create index on ajustes_verde (lote_verde_id);
create index on torras (lote_verde_id);
create index on ajustes_torrado (torra_id);
create index on empacotamentos (torra_id);
create index on vendas (cafe_id, peso);
create index on vendas (vendido_em);
create index on ajustes_pacote (cafe_id, peso);
create index on etiquetas_mov (cafe_id);

-- ---------------------------------------------------------------- saldos

create view saldo_verde with (security_invoker = true) as
select
  l.id as lote_verde_id,
  l.cafe_id,
  l.kg as kg_entrada,
  l.kg
    - coalesce((select sum(t.kg_verde) from torras t where t.lote_verde_id = l.id), 0)
    + coalesce((select sum(a.kg) from ajustes_verde a where a.lote_verde_id = l.id), 0) as kg_saldo
from lotes_verde l;

create view saldo_torrado with (security_invoker = true) as
select
  t.id as torra_id,
  l.cafe_id,
  t.torrado_em,
  t.kg_torrado,
  round((1 - t.kg_torrado / t.kg_verde) * 100, 1) as quebra_pct,
  t.kg_torrado
    - coalesce((select sum(e.quantidade * peso_kg(e.peso)) from empacotamentos e where e.torra_id = t.id), 0)
    + coalesce((select sum(a.kg) from ajustes_torrado a where a.torra_id = t.id), 0) as kg_saldo
from torras t
join lotes_verde l on l.id = t.lote_verde_id;

create view saldo_pacotes with (security_invoker = true) as
select c.id as cafe_id, p.peso::peso_pacote as peso,
  coalesce((select sum(e.quantidade) from empacotamentos e
            join torras t on t.id = e.torra_id
            join lotes_verde l on l.id = t.lote_verde_id
            where l.cafe_id = c.id and e.peso = p.peso), 0)
  - coalesce((select sum(v.quantidade) from vendas v where v.cafe_id = c.id and v.peso = p.peso), 0)
  + coalesce((select sum(a.quantidade) from ajustes_pacote a where a.cafe_id = c.id and a.peso = p.peso), 0) as quantidade
from cafes c
cross join (values ('250g'), ('500g'), ('1kg')) as p(peso);

create view saldo_etiquetas with (security_invoker = true) as
select c.id as cafe_id,
  coalesce((select sum(m.quantidade) from etiquetas_mov m where m.cafe_id = c.id), 0)
  - coalesce((select sum(e.quantidade) from empacotamentos e
              join torras t on t.id = e.torra_id
              join lotes_verde l on l.id = t.lote_verde_id
              where l.cafe_id = c.id), 0) as quantidade
from cafes c;

create view saldo_embalagens with (security_invoker = true) as
select p.peso::peso_pacote as peso,
  coalesce((select sum(m.quantidade) from embalagens_mov m where m.peso = p.peso), 0)
  - coalesce((select sum(e.quantidade) from empacotamentos e where e.peso = p.peso), 0) as quantidade
from (values ('250g'), ('500g'), ('1kg')) as p(peso);

-- ---------------------------------------------------------------- travas

-- Café não pode ficar com saldo negativo: não se torra mais verde do que há,
-- não se empacota mais torrado do que há, não se vende pacote que não existe.
-- Etiqueta e embalagem PODEM ficar negativas (a contagem costuma ser inexata),
-- o painel só sinaliza.
create function checa_saldos() returns trigger
language plpgsql as $$
declare
  ruim text;
begin
  select 'lote verde ' || lote_verde_id || ' ficaria com ' || kg_saldo || ' kg'
    into ruim from saldo_verde where kg_saldo < 0 limit 1;
  if ruim is null then
    select 'torra ' || torra_id || ' ficaria com ' || kg_saldo || ' kg de torrado'
      into ruim from saldo_torrado where kg_saldo < 0 limit 1;
  end if;
  if ruim is null then
    select 'pacotes de ' || peso || ' do café ' || cafe_id || ' ficariam em ' || quantidade
      into ruim from saldo_pacotes where quantidade < 0 limit 1;
  end if;
  if ruim is not null then
    raise exception 'Estoque insuficiente: %', ruim using errcode = 'check_violation';
  end if;
  return null;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array['lotes_verde', 'ajustes_verde', 'torras', 'ajustes_torrado',
                           'empacotamentos', 'vendas', 'ajustes_pacote'] loop
    execute format(
      'create trigger checa_saldos after insert or update or delete on %I
         for each statement execute function checa_saldos()', t);
  end loop;
end $$;

-- ---------------------------------------------------------------- RLS

do $$
declare t text;
begin
  foreach t in array array['donos', 'cafes', 'lotes_verde', 'ajustes_verde', 'torras',
                           'ajustes_torrado', 'empacotamentos', 'vendas', 'ajustes_pacote',
                           'etiquetas_mov', 'embalagens_mov'] loop
    execute format('alter table %I enable row level security', t);
    if t = 'donos' then
      -- a lista de donos só é alterada pelo painel do Supabase, nunca pelo site
      execute 'create policy donos_leem on donos for select to authenticated using (eh_dono())';
    else
      execute format(
        'create policy so_donos on %I for all to authenticated using (eh_dono()) with check (eh_dono())', t);
    end if;
  end loop;
end $$;
