import Menu from '../Menu/Menu';

export default function Layout({ children }) {
  return (
    <>
      <div>
        <Menu />
      </div>
      <div>
        {children}
      </div>
    </>
  );
}