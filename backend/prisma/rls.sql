-- Execute no SQL Editor do Supabase DEPOIS da migração.
-- A API acessa o banco pelo Prisma (role postgres, que ignora RLS).
-- Habilitar RLS sem criar políticas bloqueia o acesso externo
-- pela API REST automática do Supabase (chave anon), protegendo
-- os hashes de senha e os demais dados.
ALTER TABLE public.users           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public._prisma_migrations ENABLE ROW LEVEL SECURITY;
