import Menu from '../Menu/Menu';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
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