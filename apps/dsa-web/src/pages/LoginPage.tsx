import type React from 'react';
import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { Lock, Loader2, Cpu, Network, ShieldCheck } from "lucide-react";
import { Button, Input, ParticleBackground } from '../components/common';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { ParsedApiError } from '../api/error';
import { isParsedApiError } from '../api/error';
import { useAuth } from '../hooks';
import { SettingsAlert } from '../components/settings';

const LoginPage: React.FC = () => {
  const { login, passwordSet, setupState } = useAuth();
  const navigate = useNavigate();

  // Set page title
  useEffect(() => {
    document.title = 'Đăng nhập - DSA';
  }, []);
  const [searchParams] = useSearchParams();
  const rawRedirect = searchParams.get('redirect') ?? '';
  const redirect =
    rawRedirect.startsWith('/') && !rawRedirect.startsWith('//') ? rawRedirect : '/';

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | ParsedApiError | null>(null);

  const isFirstTime = setupState === 'no_password' || !passwordSet;

  // 3D Tilt effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (isFirstTime && password !== passwordConfirm) {
      setError('Hai lần nhập mật khẩu không khớp');
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await login(password, isFirstTime ? passwordConfirm : undefined);
      if (result.success) {
        navigate(redirect, { replace: true });
      } else {
        setError(result.error ?? 'Đăng nhập thất bại');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-x-hidden overflow-y-auto bg-[var(--login-bg-main)] px-4 py-6 font-sans selection:bg-[var(--login-accent-soft)] sm:px-6 sm:py-10 lg:px-8 [perspective:1500px]">
      {/* Dynamic Background */}
      <ParticleBackground />

      {/* Cyber Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--login-grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--login-grid-line)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:var(--login-grid-mask)]" />

      <div className="relative z-10 mx-auto w-full max-w-[26rem]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mb-5 flex flex-col items-center justify-center sm:mb-7"
        >
          <motion.div
            style={{
              x: useTransform(smoothX, [-0.5, 0.5], [-4, 4]),
              y: useTransform(smoothY, [-0.5, 0.5], [-4, 4]),
            }}
            className="pointer-events-none mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--login-accent-border)] bg-[var(--login-accent-soft)] shadow-[0_18px_48px_var(--login-accent-glow)] sm:h-20 sm:w-20"
          >
            <Cpu className="h-8 w-8 text-[var(--login-accent-text)] sm:h-10 sm:w-10" />
          </motion.div>

          <div className="flex min-w-0 flex-col items-center text-center">
            <h2 className="text-[clamp(2rem,12vw,3.75rem)] font-extrabold leading-none tracking-normal text-[var(--login-text-primary)]">
              <span className="bg-gradient-to-r from-[var(--login-text-primary)] via-[var(--login-text-primary)] to-[var(--login-text-secondary)] bg-clip-text text-transparent">DAILY </span>
              <span className="bg-gradient-to-r from-[var(--login-brand-start)] to-[var(--login-brand-end)] bg-clip-text text-transparent drop-shadow-[0_0_20px_var(--login-accent-glow)]">STOCK</span>
            </h2>
            <h3 className="mt-2 text-sm font-bold uppercase tracking-[0.24em] text-[var(--login-text-muted)] sm:text-base sm:tracking-[0.34em]">
              Analysis Engine
            </h3>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex max-w-full items-center gap-2 rounded-full border border-[var(--login-accent-border)] bg-[var(--login-accent-soft)] px-3 py-1 text-[10px] font-medium text-[var(--login-accent-text)] backdrop-blur-sm"
          >
            <Network className="h-3 w-3" />
              <span className="truncate">V3.X QUANTITATIVE SYSTEM</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group pointer-events-auto relative z-20"
        >
          {/* Card Border Glow */}
          <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-[var(--login-accent-glow)] to-[hsl(214_100%_56%_/_0.18)] opacity-50 blur-sm transition duration-1000 group-hover:opacity-90 group-hover:duration-200" />

          <div className="pointer-events-auto relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--login-border-card)] bg-[var(--login-bg-card)]/88 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            {/* Inner corner glow */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[var(--login-accent-soft)] blur-[50px]" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-600/10 blur-[50px]" />

            <div className="mb-6">
              <h1 className="flex min-w-0 items-start gap-2 text-xl font-bold leading-tight tracking-tight text-[var(--login-text-primary)] sm:text-2xl">
                {isFirstTime ? (
                  <>
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400 sm:h-6 sm:w-6" />
                    <span>Thiết lập mật khẩu ban đầu</span>
                  </>
                ) : (
                  <>
                    <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--login-accent-text)]" />
                    <span>Đăng nhập quản trị</span>
                  </>
                )}
              </h1>
              <p className="mt-2 text-sm text-[var(--login-text-secondary)]">
                {isFirstTime
                  ? 'Lần đầu bật xác thực, hãy đặt mật khẩu quản trị cho workbench.'
                  : 'Cần thông tin xác thực hợp lệ để truy cập DSA.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <Input
                  id="password"
                  type="password"
                  appearance="login"
                  allowTogglePassword
                  iconType="password"
                  label={isFirstTime ? 'Mật khẩu quản trị' : 'Mật khẩu đăng nhập'}
                  placeholder={isFirstTime ? 'Đặt mật khẩu ít nhất 6 ký tự' : 'Nhập mật khẩu'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  autoFocus
                  autoComplete={isFirstTime ? 'new-password' : 'current-password'}
                />

                {isFirstTime && (
                  <Input
                    id="passwordConfirm"
                    type="password"
                    appearance="login"
                    allowTogglePassword
                    iconType="password"
                    label="Xác nhận mật khẩu"
                    placeholder="Nhập lại mật khẩu quản trị"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    disabled={isSubmitting}
                    autoComplete="new-password"
                  />
                )}
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="overflow-hidden"
                >
                  <SettingsAlert
                    title={isFirstTime ? 'Thiết lập thất bại' : 'Xác thực chưa đạt'}
                    message={isParsedApiError(error) ? error.message : error}
                    variant="error"
                    className="!border-[var(--login-error-border)] !bg-[var(--login-error-bg)] !text-[var(--login-error-text)]"
                  />
                </motion.div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="group/btn relative h-12 w-full overflow-hidden rounded-xl border-0 bg-gradient-to-r from-[var(--login-brand-button-start)] to-[var(--login-brand-button-end)] font-medium text-[var(--login-button-text)] shadow-lg shadow-[0_18px_36px_hsl(214_100%_8%_/_0.24)] hover:from-[var(--login-brand-button-start-hover)] hover:to-[var(--login-brand-button-end-hover)]"
                disabled={isSubmitting}
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{isFirstTime ? 'Đang khởi tạo...' : 'Đang kết nối...'}</span>
                    </>
                  ) : (
                    <span>{isFirstTime ? 'Hoàn tất và đăng nhập' : 'Vào workbench'}</span>
                  )}
                </div>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Footer info */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 px-2 text-center font-mono text-[10px] uppercase tracking-wider text-[var(--login-text-muted)] sm:text-xs"
        >
          Secure Connection Established via DSA-V3-TLS
        </motion.p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}} />
    </div>
  );
};

export default LoginPage;
