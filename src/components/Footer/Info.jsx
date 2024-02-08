import React from 'react';
import FooterLogo from './qri-hd-footer-logo.png';
import SocialList from './social';
import { HiBadgeCheck } from 'react-icons/hi';

const FooterInfo =()=> {
  return (
    <aside>
        <div className="footer-logo-area mb-4">
            <img src={`${FooterLogo}`} alt="" />
        </div>
        <div className="footer-info-content mb-4">
            <p className='mb-1'>Copyright © 2023 Vince Chain Inc.</p>
            <p className='mb-0'>All rights reserved</p>
        </div>
        <div className="footer-info-social">
            <SocialList />
        </div>
        <a target="_blank" rel="noreferrer" className="btn btn-light safu_btn" href="https://t.me/TrynosTokenTerminal/373">Safu badge <HiBadgeCheck className='icon' /></a>
    </aside>
  )
}

export default FooterInfo