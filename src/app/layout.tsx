import { Footer } from '@/components/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
