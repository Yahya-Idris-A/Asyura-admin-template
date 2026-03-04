import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Definisikan Whitelist (Rute yang BOLEH diakses tanpa login)
const publicRoutes = ['/sign-in', '/request-access'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.includes(pathname);

  // Skenario 1: User BELUM login dan mencoba akses rute SELAIN public routes
  if (!token && !isPublicRoute) {
    // Tendang ke halaman sign-in
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Skenario 2: User SUDAH login, tapi mencoba akses public routes (seperti sign-in) atau root ('/')
  if (token && (isPublicRoute || pathname === '/')) {
    // Arahkan ke halaman utama dashboard kita
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Skenario 3: Lolos semua pengecekan, silakan lewat
  return NextResponse.next();
}

// 2. Konfigurasi Matcher (SANGAT PENTING)
// Kita harus menyuruh middleware mengecek SEMUA rute,
// KECUALI aset statis (gambar, css, js) agar aplikasi tidak error/lambat.
export const config = {
  matcher: [
    /*
     * Match semua request paths KECUALI yang berawalan:
     * - api (API routes, biasanya punya validasi token sendiri di backend)
     * - _next/static (file statis Next.js)
     * - _next/image (file optimasi gambar Next.js)
     * - favicon.ico (icon browser)
     * - Semua file dengan ekstensi gambar (.png, .jpg, .jpeg, .svg, .webp)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};