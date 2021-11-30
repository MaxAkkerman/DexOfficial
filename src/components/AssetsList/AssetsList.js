import './AssetsList.scss';

import CalculateTimeLeft from '../../hooks/useTimer';
import TON from '../../images/tonCrystalDefault.svg';
import {
  formatDate,
  getDurationFromSeconds,
} from '../../reactUtils/getDurationFromSeconds';
import { calculateRate } from '../../reactUtils/reactUtils';
import AssetListOrderItem from '../AssetListOrderItem/AssetListOrderItem';

function AssetsList(props) {
  return (
    <div
      className={
        props.assetWrap ? props.assetWrap + ' assets_wrapper' : 'assets_wrapper'
      }
      onClick={() => console.log('props', props)}
    >
      {props.TokenAssetsArray.sort(
        (a, b) => (b.balance || 0) - (a.balance || 0),
      ).map((item, i) => (
        <div
          className="assets_item_wrapper"
          onClick={() => props.handleClickToken(item)}
          key={i}
        >
          <div className={'assetsList__container'}>
            <div className={'assetsList__item'}>
              <div className={'assetList__item_meta'}>
                <img
                  className="arrow_icons2"
                  src={item.icon}
                  alt={'send assetsList'}
                />
                <div className="assetsList__meta_container">
                  <div className={'assetsList__symbol'}>{item.symbol}</div>
                  <div className={'assetList__token_name'}>
                    {item.tokenName}
                  </div>
                </div>
              </div>
              <div
                className={
                  props.isAssetsInspector
                    ? 'assetList__token_balance wordBreak'
                    : 'assetList__token_balance'
                }
              >
                {item.balance === 0
                  ? '0.0000'
                  : item.balance < 0.0001
                  ? parseFloat(item.balance).toFixed(8)
                  : parseFloat(item.balance).toFixed(4)}
              </div>
            </div>
            {item.showWrapMenu && props.showItBeShown && (
              <div className="NFT_additional_data">
                <div className="NFT_additional_block end">
                  {/*    <div>*/}
                  {/*        <div className="swap-confirm-wrap">*/}
                  {/*            /!*<p className="mainblock-footer-value">{item.details.apyLockStake / 100}%</p>*!/*/}
                  {/*            <p className="mainblock-footer-subtitle">APY</p>*/}
                  {/*        </div>*/}
                  {/*        <div className="swap-confirm-wrap">*/}
                  {/*            /!*<p className="mainblock-footer-value">{getDurationFromSeconds(item.details.periodLockStake, "days")} days</p>*!/*/}
                  {/*            <p className="mainblock-footer-subtitle">Period</p>*/}
                  {/*        </div>*/}
                  {/*        <div className="swap-confirm-wrap">*/}
                  {/*            /!*<p className="mainblock-footer-value">{formatDate(Number(item.details.timeStartLockStake))}</p>*!/*/}
                  {/*            <p className="mainblock-footer-subtitle">Start time</p>*/}
                  {/*        </div>*/}

                  {/*    </div>*/}
                  {/*    <div>*/}
                  {/*        <div className="swap-confirm-wrap">*/}
                  {/*            /!*<p className="mainblock-footer-value fixFlex"><img style={{marginRight: "5px"}}*!/*/}
                  {/*            /!*                                                   src={TON}*!/*/}
                  {/*            /!*                                                   alt={"Ton Crystal"}/> {(Number(item.stakeTotal)) / 1000000000}*!/*/}
                  {/*            /!*</p>*!/*/}
                  {/*            <p className="mainblock-footer-subtitle">Stake</p>*/}
                  {/*        </div>*/}
                  {/*        <div className="swap-confirm-wrap">*/}
                  {/*            /!*<p className="mainblock-footer-value fixFlex"><img style={{marginRight: "5px"}}*!/*/}
                  {/*            /!*                                                   src={TON}*!/*/}
                  {/*            /!*                                                   alt={"Ton Crystal"}/> {((calculateRate(item.stakeTotal, item.details.apyLockStake / 100, (item.details.periodLockStake / 30 / 60 / 60 / 24)) - Number(item.stakeTotal)) / 1000000000).toFixed(4)}*!/*/}
                  {/*            /!*</p>*!/*/}
                  {/*            <p className="mainblock-footer-subtitle">Profit</p>*/}
                  {/*        </div>*/}
                  {/*        <div className="swap-confirm-wrap">*/}
                  {/*            /!*<p className="mainblock-footer-value fixFlex">*!/*/}
                  {/*            /!*    <img style={{marginRight: "5px"}} src={TON}*!/*/}
                  {/*            /!*         alt={"Ton Crystal"}/> {((calculateRate(item.stakeTotal, item.details.apyLockStake / 100, item.details.periodLockStake / 30 / 60 / 60 / 24)) / 1000000000).toFixed(4)}*!/*/}

                  {/*            /!*</p>*!/*/}
                  {/*            <p className="mainblock-footer-subtitle">Total income</p>*/}
                  {/*        </div>*/}
                  {/*    </div>*/}

                  {/*<div className={"settings_btn_container"}>*/}
                  <button
                    className="settings_btn wrapUnwrap"
                    onClick={props.wrapTons ? () => props.wrapTons() : null}
                  >
                    Wrap
                  </button>
                  <button
                    className="settings_btn wrapUnwrap"
                    onClick={props.unWrapTons ? () => props.unWrapTons() : null}
                  >
                    Unwrap
                  </button>
                  {/*</div>*/}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      {props.NFTassetsArray &&
        props.NFTassetsArray.map((item) => (
          <div className="assets_item_wrapper" key={item._safeLockStake}>
            <div className="NFT_item">
              <div
                className="NFT_item_header"
                onClick={() => props.handleClickNFT(item)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div className="assetList_item_icon">
                    <img
                      className="arrow_icons2"
                      src={item.icon}
                      alt={'send assetsList'}
                    />
                  </div>
                  <div style={{ marginLeft: '15px' }}>
                    <div style={{ fontWeight: 'bold' }}>DePool stake</div>
                    <div style={{ fontSize: '14px' }}>NFT Lock stake</div>
                  </div>
                </div>
                <div>{Number(item.stakeTotal / 1e9).toFixed(4)}</div>
              </div>
              {item.showNftData && (
                <div
                  className="NFT_additional_data"
                  style={{ flexDirection: 'column' }}
                >
                  <div>
                    <div
                      className="NFT_additional_block"
                      style={{
                        marginLeft: '70px',
                        fontSize: '16px',
                        flexShrink: '0',
                      }}
                    >
                      <div style={{ width: '80%' }}>
                        <div className="swap-confirm-wrap">
                          <p className="mainblock-footer-value">{item.type}</p>
                          <p className="mainblock-footer-subtitle">Type</p>
                        </div>
                        <div className="swap-confirm-wrap">
                          <p className="mainblock-footer-value">
                            {item.details.apyLockStake / 100}%
                          </p>
                          <p className="mainblock-footer-subtitle">APY</p>
                        </div>
                        <div className="swap-confirm-wrap">
                          <p className="mainblock-footer-value">
                            {getDurationFromSeconds(
                              item.details.periodLockStake,
                              'days',
                            ).toFixed()}{' '}
                            days
                          </p>
                          <p className="mainblock-footer-subtitle">Period</p>
                        </div>
                      </div>
                      <div style={{ width: '100%' }}>
                        <div className="swap-confirm-wrap">
                          <p className="mainblock-footer-value">
                            {formatDate(
                              Number(item.details.timeStartLockStake),
                            )}
                          </p>
                          <p className="mainblock-footer-subtitle">
                            Start time
                          </p>
                        </div>

                        <div className="swap-confirm-wrap">
                          <p className="mainblock-footer-value">
                            {formatDate(
                              Number(item.details.timeStartLockStake) +
                                Number(item.details.periodLockStake),
                            )}
                          </p>
                          <p className="mainblock-footer-subtitle">End Time</p>
                        </div>

                        <div className="swap-confirm-wrap">
                          <p
                            className="mainblock-footer-value"
                            style={{ width: '215px' }}
                          >
                            {
                              <CalculateTimeLeft
                                date={
                                  new Date(
                                    (Number(item.details.timeStartLockStake) +
                                      Number(item.details.periodLockStake)) *
                                      1000,
                                  )
                                }
                              />
                            }
                          </p>
                          <p className="mainblock-footer-subtitle">Estimate</p>
                        </div>
                      </div>
                      <div style={{ width: '100%' }}>
                        <div className="swap-confirm-wrap">
                          <p className="mainblock-footer-value fixFlex">
                            <img
                              style={{ marginRight: '5px', width: '20px' }}
                              src={TON}
                              alt={'Ton Crystal'}
                            />{' '}
                            {Number(item.stakeTotal) / 1000000000}
                          </p>
                          <p className="mainblock-footer-subtitle">Stake</p>
                        </div>
                        <div className="swap-confirm-wrap">
                          <p className="mainblock-footer-value fixFlex">
                            <img
                              style={{ marginRight: '5px', width: '20px' }}
                              src={TON}
                              alt={'Ton Crystal'}
                            />{' '}
                            {(
                              (calculateRate(
                                item.stakeTotal,
                                item.details.apyLockStake / 100,
                                item.details.periodLockStake /
                                  30 /
                                  60 /
                                  60 /
                                  24,
                              ) -
                                Number(item.stakeTotal)) /
                              1000000000
                            ).toFixed(4)}
                          </p>
                          <p className="mainblock-footer-subtitle">Profit</p>
                        </div>
                        <div className="swap-confirm-wrap">
                          <p className="mainblock-footer-value fixFlex">
                            <img
                              style={{ marginRight: '5px', width: '20px' }}
                              src={TON}
                              alt={'Ton Crystal'}
                            />{' '}
                            {(
                              calculateRate(
                                item.stakeTotal,
                                item.details.apyLockStake / 100,
                                item.details.periodLockStake /
                                  30 /
                                  60 /
                                  60 /
                                  24,
                              ) / 1000000000
                            ).toFixed(4)}
                          </p>
                          <p className="mainblock-footer-subtitle">
                            Total income
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      // marginLeft:"20px",
                      display: 'flex',
                      justifyContent: 'end',
                    }}
                  >
                    <button
                      className="settings_btn"
                      style={{
                        width: '110px',
                        height: '63px',
                        color: 'white',
                        fontSize: '20px',
                        marginTop: '20px',
                      }}
                      onClick={
                        props.handleWithdraw
                          ? () => props.handleWithdraw(item)
                          : null
                      }
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      {props.orderAssetArray &&
        props.orderAssetArray.map((lo) => (
          <AssetListOrderItem key={lo.addrOrder} limitOrder={lo} />
        ))}
    </div>
  );
}

export default AssetsList;
