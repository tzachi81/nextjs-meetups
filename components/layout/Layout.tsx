import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import { ReactNode } from 'react';

interface ILayoutProps {
  children: ReactNode
}

const Layout: React.FC<ILayoutProps> = (props) => {
  return (
    <div>
      <MainNavigation  />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
