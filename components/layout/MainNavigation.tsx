import classes from './MainNavigation.module.css';
import Link from 'next/link';

interface IMainNavigationProps{

}

export const MainNavigation: React.FC<IMainNavigationProps> = () => {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>NextJS Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
