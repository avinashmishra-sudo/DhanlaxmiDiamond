-- ===================================================
-- DHANLAXMI DIAMOND — SUPABASE POSTGRESQL SCHEMA
-- PRODUCTION ENTERPRISE GRADE WITH ROW LEVEL SECURITY
-- ===================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE diamond_origin AS ENUM ('Natural', 'Lab-Grown');
CREATE TYPE diamond_shape AS ENUM ('Round', 'Oval', 'Emerald', 'Radiant', 'Cushion', 'Pear', 'Princess', 'Marquise', 'Asscher', 'Heart');
CREATE TYPE diamond_color AS ENUM ('D', 'E', 'F', 'G', 'H', 'I', 'J', 'Fancy Yellow', 'Fancy Pink');
CREATE TYPE diamond_clarity AS ENUM ('FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2');
CREATE TYPE diamond_cut AS ENUM ('Ideal', 'Excellent', 'Very Good');
CREATE TYPE jewelry_category AS ENUM ('Rings', 'Earrings', 'Necklaces', 'Bracelets', 'Bridal', 'Custom Jewelry');
CREATE TYPE precious_metal AS ENUM ('18k White Gold', '18k Yellow Gold', '18k Rose Gold', 'Platinum', 'Two-Tone 18k Gold');
CREATE TYPE enquiry_status AS ENUM ('New', 'In Consultation', 'Quoted', 'Completed');

-- 3. DIAMONDS TABLE
CREATE TABLE IF NOT EXISTS public.diamonds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type diamond_origin NOT NULL DEFAULT 'Natural',
    shape diamond_shape NOT NULL DEFAULT 'Round',
    carat NUMERIC(5, 2) NOT NULL,
    color diamond_color NOT NULL,
    clarity diamond_clarity NOT NULL,
    cut diamond_cut NOT NULL DEFAULT 'Excellent',
    polish VARCHAR(32) NOT NULL DEFAULT 'Excellent',
    symmetry VARCHAR(32) NOT NULL DEFAULT 'Excellent',
    fluorescence VARCHAR(32) NOT NULL DEFAULT 'None',
    certificate_lab VARCHAR(32) NOT NULL DEFAULT 'GIA',
    certificate_number VARCHAR(64) NOT NULL,
    measurements VARCHAR(64) NOT NULL,
    table_pct NUMERIC(4, 1),
    depth_pct NUMERIC(4, 1),
    ratio VARCHAR(16),
    price NUMERIC(12, 2),
    price_type VARCHAR(16) NOT NULL DEFAULT 'on_request',
    description TEXT,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    featured BOOLEAN NOT NULL DEFAULT false,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. JEWELRY TABLE
CREATE TABLE IF NOT EXISTS public.jewelry (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category jewelry_category NOT NULL,
    collection_name VARCHAR(128),
    metal precious_metal NOT NULL DEFAULT 'Platinum',
    total_diamond_weight VARCHAR(64) NOT NULL,
    center_stone VARCHAR(128),
    description TEXT,
    price NUMERIC(12, 2),
    price_type VARCHAR(16) NOT NULL DEFAULT 'on_request',
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    specs JSONB NOT NULL DEFAULT '{}'::jsonb,
    featured BOOLEAN NOT NULL DEFAULT false,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. COLLECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(128) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    description TEXT,
    hero_image TEXT NOT NULL,
    featured_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(64) NOT NULL,
    client_country VARCHAR(128) NOT NULL,
    budget_range VARCHAR(64) NOT NULL,
    requirement_type VARCHAR(64) NOT NULL,
    timeline VARCHAR(64),
    message TEXT NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    status enquiry_status NOT NULL DEFAULT 'New',
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    category VARCHAR(64) NOT NULL,
    excerpt TEXT NOT NULL,
    read_time VARCHAR(32) NOT NULL,
    author VARCHAR(128) NOT NULL,
    cover_image TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '[]'::jsonb,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. SITE SETTINGS & CMS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    key VARCHAR(64) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.diamonds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jewelry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read diamonds, jewelry, collections, published blog posts, and site settings
CREATE POLICY "Public can view in-stock diamonds" ON public.diamonds
    FOR SELECT USING (in_stock = true);

CREATE POLICY "Public can view in-stock jewelry" ON public.jewelry
    FOR SELECT USING (in_stock = true);

CREATE POLICY "Public can view collections" ON public.collections
    FOR SELECT USING (true);

CREATE POLICY "Public can view published blog posts" ON public.blog_posts
    FOR SELECT USING (published = true);

CREATE POLICY "Public can view site settings" ON public.site_settings
    FOR SELECT USING (true);

-- Public can submit an enquiry, but CANNOT read enquiries
CREATE POLICY "Public can insert enquiries" ON public.enquiries
    FOR INSERT WITH CHECK (true);

-- Authenticated admins can perform all actions
CREATE POLICY "Admins full access diamonds" ON public.diamonds
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access jewelry" ON public.jewelry
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access collections" ON public.collections
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access enquiries" ON public.enquiries
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access blog posts" ON public.blog_posts
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access site settings" ON public.site_settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
