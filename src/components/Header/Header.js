import React from 'react';

import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../store/actions/app';
import Wallet from '../Wallet/Wallet';
import HeaderMore from '../HeaderMore/HeaderMore';
import './Header.scss';

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useSelector((state) => state.appReducer.appTheme);
  const clientData = useSelector((state) => state.walletReducer.clientData);

  const linkIsActive = (loc) => {
    console.log('eee', location.pathname, 'loc', loc);

    let x;
    location.pathname === loc ? (x = true) : (x = false);
    return x;
  };

  function handlePushToLogin() {
    history.push('/account');
  }

  return (
    <header className="header">
      <div className="header-wrap">
        <div className="header__items">
          <NavLink
            to="/swap"
            className="header-link"
            activeClassName="header-link--active"
          >
            Swap
          </NavLink>
          <NavLink
            to="/orders"
            className="header-link"
            activeClassName="header-link--active"
          >
            Limit orders
          </NavLink>
          <NavLink
            to="/pool"
            className={
              linkIsActive('/pool')
                ? 'header-link header-link--active'
                : 'header-link'
            }
          >
            Provide Liquidity
          </NavLink>

          <NavLink
            to="/pool-explorer"
            className={
              linkIsActive('/pool-explorer')
                ? 'header-link header-link--active'
                : 'header-link'
            }
          >
            Pool Explorer
          </NavLink>
          <NavLink
            to="/wallet"
            className={
              linkIsActive('/wallet')
                ? 'header-link header-link--active'
                : 'header-link'
            }
          >
            Assets
          </NavLink>
          <NavLink
            to="/staking"
            className={
              linkIsActive('/staking')
                ? 'header-link header-link--active'
                : 'header-link'
            }
          >
            Staking
          </NavLink>
        </div>
      </div>
      <div className="header-wrap">
        {/*<NativeLogin/>*/}
        {clientData.status ? (
          <Wallet />
        ) : (
          <button className="btn wallet-btn" onClick={handlePushToLogin}>
            Connect wallet
          </button>
        )}

        {/*<Wallet />*/}
        {/*<WalletButton />*/}
        {/*<PoolExplorerButton />*/}

        <button
          className="btn action-btn header-btn"
          onClick={() =>
            dispatch(changeTheme(theme === 'light' ? 'dark' : 'light'))
          }
        >
          {theme === 'light' ? (
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0082 1.00004C12.9093 1.00106 12.8115 1.02172 12.7206 1.0608C12.6296 1.09989 12.5474 1.15663 12.4785 1.22775C12.4096 1.29887 12.3555 1.38297 12.3193 1.47515C12.2831 1.56734 12.2655 1.66579 12.2676 1.76483V4.26208C12.2662 4.36136 12.2845 4.45992 12.3215 4.55204C12.3585 4.64417 12.4134 4.72803 12.483 4.79873C12.5526 4.86943 12.6356 4.92556 12.7271 4.96388C12.8186 5.0022 12.9168 5.02194 13.016 5.02194C13.1152 5.02194 13.2134 5.0022 13.3049 4.96388C13.3964 4.92556 13.4794 4.86943 13.549 4.79873C13.6186 4.72803 13.6735 4.64417 13.7105 4.55204C13.7475 4.45992 13.7658 4.36136 13.7644 4.26208V1.76483C13.7665 1.66448 13.7484 1.56474 13.7113 1.47152C13.6741 1.3783 13.6186 1.29351 13.5481 1.22218C13.4775 1.15085 13.3934 1.09443 13.3007 1.05627C13.2079 1.01811 13.1085 0.998984 13.0082 1.00004ZM5.0718 4.2933C4.92257 4.29294 4.77664 4.33725 4.65274 4.42053C4.52885 4.50381 4.43265 4.62225 4.3765 4.76066C4.32036 4.89907 4.30683 5.05113 4.33765 5.19729C4.36847 5.34346 4.44223 5.47707 4.54947 5.58096L6.31138 7.35244C6.381 7.42213 6.46365 7.47742 6.55461 7.51513C6.64557 7.55285 6.74306 7.57225 6.84151 7.57225C6.93997 7.57225 7.03746 7.55285 7.12842 7.51513C7.21938 7.47742 7.30203 7.42213 7.37165 7.35244C7.44126 7.28276 7.49649 7.20003 7.53416 7.10897C7.57184 7.01792 7.59123 6.92033 7.59123 6.82177C7.59123 6.72322 7.57184 6.62564 7.53416 6.53459C7.49649 6.44354 7.44126 6.36079 7.37165 6.2911L5.60973 4.51962C5.53978 4.44776 5.45611 4.39071 5.36371 4.35183C5.2713 4.31296 5.17204 4.29305 5.0718 4.2933ZM20.9368 4.2933C20.7424 4.29897 20.5579 4.38014 20.4223 4.51962L18.6604 6.2911C18.5907 6.36079 18.5355 6.44354 18.4978 6.53459C18.4602 6.62564 18.4408 6.72322 18.4408 6.82177C18.4408 6.92033 18.4602 7.01792 18.4978 7.10897C18.5355 7.20003 18.5907 7.28276 18.6604 7.35244C18.73 7.42213 18.8126 7.47742 18.9036 7.51513C18.9945 7.55285 19.092 7.57225 19.1905 7.57225C19.2889 7.57225 19.3864 7.55285 19.4774 7.51513C19.5683 7.47742 19.651 7.42213 19.7206 7.35244L21.4825 5.58096C21.5914 5.47571 21.6658 5.33991 21.6959 5.19148C21.7261 5.04305 21.7106 4.88894 21.6515 4.74949C21.5924 4.61005 21.4925 4.49182 21.3649 4.41038C21.2373 4.32894 21.088 4.28811 20.9368 4.2933ZM13.016 8.2599C9.30478 8.2599 8.2802 9.28753 8.2802 13.0025C8.2802 16.7175 9.30478 17.7451 13.016 17.7451C16.7272 17.7451 17.7518 16.7175 17.7518 13.0025C17.7518 9.28753 16.7272 8.2599 13.016 8.2599ZM13.016 9.75825C15.9183 9.75825 16.255 10.0973 16.255 13.0025C16.255 15.9077 15.9183 16.2467 13.016 16.2467C10.1137 16.2467 9.77704 15.9077 9.77704 13.0025C9.77704 10.0973 10.1137 9.75825 13.016 9.75825ZM1.7117 12.2533C1.6133 12.2583 1.51685 12.2826 1.42786 12.3249C1.33887 12.3673 1.25908 12.4267 1.19308 12.4999C1.12707 12.5732 1.07613 12.6587 1.04317 12.7516C1.01022 12.8446 0.99589 12.9431 1.00101 13.0416C1.00614 13.1401 1.03061 13.2366 1.07304 13.3256C1.11546 13.4146 1.175 13.4944 1.24825 13.5603C1.3215 13.6263 1.40702 13.6771 1.49992 13.71C1.59282 13.7428 1.69128 13.757 1.78966 13.7517H4.2844C4.38357 13.7531 4.48202 13.7347 4.57404 13.6977C4.66606 13.6607 4.74981 13.6057 4.82043 13.536C4.89105 13.4663 4.94712 13.3832 4.9854 13.2916C5.02367 13.2001 5.04338 13.1018 5.04338 13.0025C5.04338 12.9032 5.02367 12.8049 4.9854 12.7133C4.94712 12.6218 4.89105 12.5387 4.82043 12.469C4.74981 12.3993 4.66606 12.3443 4.57404 12.3073C4.48202 12.2703 4.38357 12.2519 4.2844 12.2533H1.78966C1.76369 12.252 1.73767 12.252 1.7117 12.2533ZM21.6696 12.2533C21.4714 12.264 21.2854 12.353 21.1527 12.5007C21.0199 12.6485 20.9511 12.843 20.9614 13.0414C20.9718 13.2399 21.0603 13.4262 21.2077 13.5594C21.3551 13.6925 21.5493 13.7617 21.7476 13.7517H24.2423C24.3415 13.7531 24.44 13.7347 24.532 13.6977C24.624 13.6607 24.7077 13.6057 24.7784 13.536C24.849 13.4663 24.9051 13.3832 24.9433 13.2916C24.9816 13.2001 25.0013 13.1018 25.0013 13.0025C25.0013 12.9032 24.9816 12.8049 24.9433 12.7133C24.9051 12.6218 24.849 12.5387 24.7784 12.469C24.7077 12.3993 24.624 12.3443 24.532 12.3073C24.44 12.2703 24.3415 12.2519 24.2423 12.2533H21.7476C21.7216 12.252 21.6956 12.252 21.6696 12.2533ZM6.75576 18.4262C6.58614 18.4486 6.42931 18.5285 6.31138 18.6526L4.54947 20.4162C4.40887 20.557 4.32988 20.7479 4.32987 20.9469C4.32987 21.1459 4.40886 21.3368 4.54946 21.4776C4.69006 21.6183 4.88076 21.6974 5.0796 21.6974C5.27844 21.6974 5.46913 21.6183 5.60973 21.4776L7.37165 19.7061C7.48393 19.5965 7.55899 19.4543 7.58622 19.2997C7.61346 19.1451 7.5915 18.9859 7.52344 18.8444C7.45538 18.703 7.34466 18.5866 7.20692 18.5115C7.06917 18.4365 6.91136 18.4066 6.75576 18.4262ZM19.1047 18.4262C18.9637 18.4413 18.8298 18.4963 18.7188 18.5847C18.6077 18.673 18.5241 18.7911 18.4775 18.9252C18.4309 19.0594 18.4234 19.2039 18.4558 19.3422C18.4881 19.4804 18.5591 19.6066 18.6604 19.7061L20.4223 21.4776C20.5629 21.6183 20.7536 21.6974 20.9524 21.6974C21.1512 21.6974 21.3419 21.6183 21.4825 21.4776C21.6231 21.3368 21.7021 21.1459 21.7021 20.9469C21.7021 20.7479 21.6231 20.557 21.4825 20.4162L19.7206 18.6526C19.6419 18.5705 19.5455 18.5074 19.4388 18.4682C19.3321 18.429 19.2178 18.4146 19.1047 18.4262ZM13.0082 20.9781C12.9093 20.9791 12.8115 20.9998 12.7206 21.0389C12.6296 21.078 12.5474 21.1347 12.4785 21.2058C12.4096 21.277 12.3555 21.361 12.3193 21.4532C12.2831 21.5454 12.2655 21.6439 12.2676 21.7429V24.2401C12.2662 24.3394 12.2845 24.438 12.3215 24.5301C12.3585 24.6222 12.4134 24.7061 12.483 24.7768C12.5526 24.8475 12.6356 24.9036 12.7271 24.942C12.8186 24.9803 12.9168 25 13.016 25C13.1152 25 13.2134 24.9803 13.3049 24.942C13.3964 24.9036 13.4794 24.8475 13.549 24.7768C13.6186 24.7061 13.6735 24.6222 13.7105 24.5301C13.7475 24.438 13.7658 24.3394 13.7644 24.2401V21.7429C13.7665 21.6425 13.7484 21.5428 13.7113 21.4496C13.6741 21.3564 13.6186 21.2716 13.5481 21.2003C13.4775 21.1289 13.3934 21.0725 13.3007 21.0343C13.2079 20.9962 13.1085 20.9771 13.0082 20.9781Z"
                fill="#41444E"
                stroke="#41444E"
                strokeWidth="1.5"
              />
            </svg>
          ) : (
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.7077 14.9274C24.4849 14.8004 24.2052 14.8354 24.0203 15.013C22.2705 16.6957 20.0031 17.6224 17.6359 17.6224C12.6173 17.6224 8.37764 13.3827 8.37764 8.36419C8.37764 5.99728 9.30433 3.72989 10.987 1.97981C11.1649 1.79493 11.1997 1.51516 11.0727 1.29238C10.9459 1.06961 10.6873 0.956486 10.4376 1.01551C4.96917 2.30124 1 7.27809 1 12.8486C1 19.4355 6.56448 25 13.1514 25C18.722 25 23.6986 21.0311 24.9846 15.5627C25.0433 15.313 24.9308 15.0544 24.7077 14.9274ZM13.1514 23.8427C7.19201 23.8427 2.15728 18.808 2.15728 12.8486C2.15728 8.43913 4.9087 4.44046 8.91346 2.72972C7.81202 4.40805 7.22037 6.35343 7.22037 8.36419C7.22037 14.01 11.9901 18.7797 17.6359 18.7797C19.6466 18.7797 21.592 18.188 23.2704 17.0866C21.5596 21.0913 17.5609 23.8427 13.1514 23.8427Z"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>
        <HeaderMore />
      </div>
    </header>
  );
}

export default Header;
