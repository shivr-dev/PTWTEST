(function(){
  'use strict';
  const OFFICIAL_BASE = 'https://ptw2027.org/ptw2027-score.html';
  function md5(input){
    function cmn(q,a,b,x,s,t){a=add32(add32(a,q),add32(x,t));return add32((a<<s)|(a>>>(32-s)),b)}
    function ff(a,b,c,d,x,s,t){return cmn((b&c)|((~b)&d),a,b,x,s,t)}
    function gg(a,b,c,d,x,s,t){return cmn((b&d)|(c&(~d)),a,b,x,s,t)}
    function hh(a,b,c,d,x,s,t){return cmn(b^c^d,a,b,x,s,t)}
    function ii(a,b,c,d,x,s,t){return cmn(c^(b|(~d)),a,b,x,s,t)}
    function md5cycle(x,k){let a=x[0],b=x[1],c=x[2],d=x[3];
      a=ff(a,b,c,d,k[0],7,-680876936);d=ff(d,a,b,c,k[1],12,-389564586);c=ff(c,d,a,b,k[2],17,606105819);b=ff(b,c,d,a,k[3],22,-1044525330);
      a=ff(a,b,c,d,k[4],7,-176418897);d=ff(d,a,b,c,k[5],12,1200080426);c=ff(c,d,a,b,k[6],17,-1473231341);b=ff(b,c,d,a,k[7],22,-45705983);
      a=ff(a,b,c,d,k[8],7,1770035416);d=ff(d,a,b,c,k[9],12,-1958414417);c=ff(c,d,a,b,k[10],17,-42063);b=ff(b,c,d,a,k[11],22,-1990404162);
      a=ff(a,b,c,d,k[12],7,1804603682);d=ff(d,a,b,c,k[13],12,-40341101);c=ff(c,d,a,b,k[14],17,-1502002290);b=ff(b,c,d,a,k[15],22,1236535329);
      a=gg(a,b,c,d,k[1],5,-165796510);d=gg(d,a,b,c,k[6],9,-1069501632);c=gg(c,d,a,b,k[11],14,643717713);b=gg(b,c,d,a,k[0],20,-373897302);
      a=gg(a,b,c,d,k[5],5,-701558691);d=gg(d,a,b,c,k[10],9,38016083);c=gg(c,d,a,b,k[15],14,-660478335);b=gg(b,c,d,a,k[4],20,-405537848);
      a=gg(a,b,c,d,k[9],5,568446438);d=gg(d,a,b,c,k[14],9,-1019803690);c=gg(c,d,a,b,k[3],14,-187363961);b=gg(b,c,d,a,k[8],20,1163531501);
      a=gg(a,b,c,d,k[13],5,-1444681467);d=gg(d,a,b,c,k[2],9,-51403784);c=gg(c,d,a,b,k[7],14,1735328473);b=gg(b,c,d,a,k[12],20,-1926607734);
      a=hh(a,b,c,d,k[5],4,-378558);d=hh(d,a,b,c,k[8],11,-2022574463);c=hh(c,d,a,b,k[11],16,1839030562);b=hh(b,c,d,a,k[14],23,-35309556);
      a=hh(a,b,c,d,k[1],4,-1530992060);d=hh(d,a,b,c,k[4],11,1272893353);c=hh(c,d,a,b,k[7],16,-155497632);b=hh(b,c,d,a,k[10],23,-1094730640);
      a=hh(a,b,c,d,k[13],4,681279174);d=hh(d,a,b,c,k[0],11,-358537222);c=hh(c,d,a,b,k[3],16,-722521979);b=hh(b,c,d,a,k[6],23,76029189);
      a=hh(a,b,c,d,k[9],4,-640364487);d=hh(d,a,b,c,k[12],11,-421815835);c=hh(c,d,a,b,k[15],16,530742520);b=hh(b,c,d,a,k[2],23,-995338651);
      a=ii(a,b,c,d,k[0],6,-198630844);d=ii(d,a,b,c,k[7],10,1126891415);c=ii(c,d,a,b,k[14],15,-1416354905);b=ii(b,c,d,a,k[5],21,-57434055);
      a=ii(a,b,c,d,k[12],6,1700485571);d=ii(d,a,b,c,k[3],10,-1894986606);c=ii(c,d,a,b,k[10],15,-1051523);b=ii(b,c,d,a,k[1],21,-2054922799);
      a=ii(a,b,c,d,k[8],6,1873313359);d=ii(d,a,b,c,k[15],10,-30611744);c=ii(c,d,a,b,k[6],15,-1560198380);b=ii(b,c,d,a,k[13],21,1309151649);
      a=ii(a,b,c,d,k[4],6,-145523070);d=ii(d,a,b,c,k[11],10,-1120210379);c=ii(c,d,a,b,k[2],15,718787259);b=ii(b,c,d,a,k[9],21,-343485551);
      x[0]=add32(a,x[0]);x[1]=add32(b,x[1]);x[2]=add32(c,x[2]);x[3]=add32(d,x[3]);
    }
    function md5blk(s){let md5blks=[],i;for(i=0;i<64;i+=4){md5blks[i>>2]=s.charCodeAt(i)+(s.charCodeAt(i+1)<<8)+(s.charCodeAt(i+2)<<16)+(s.charCodeAt(i+3)<<24)}return md5blks}
    function md51(s){s=unescape(encodeURIComponent(String(s)));let n=s.length,state=[1732584193,-271733879,-1732584194,271733878],i;for(i=64;i<=n;i+=64)md5cycle(state,md5blk(s.substring(i-64,i)));s=s.substring(i-64);let tail=new Array(16).fill(0);for(i=0;i<s.length;i++)tail[i>>2]|=s.charCodeAt(i)<<((i%4)<<3);tail[i>>2]|=0x80<<((i%4)<<3);if(i>55){md5cycle(state,tail);tail=new Array(16).fill(0)}tail[14]=n*8;md5cycle(state,tail);return state}
    function rhex(n){let s='',j;for(j=0;j<4;j++)s+=('0'+((n>>(j*8))&255).toString(16)).slice(-2);return s}
    function hex(x){return x.map(rhex).join('')}
    function add32(a,b){return (a+b)&0xffffffff}
    return hex(md51(input));
  }
  const CODE39 = {
    '0':'101001101101','1':'110100101011','2':'101100101011','3':'110110010101','4':'101001101011','5':'110100110101','6':'101100110101','7':'101001011011','8':'110100101101','9':'101100101101','A':'110101001011','B':'101101001011','C':'110110100101','D':'101011001011','E':'110101100101','F':'101101100101','G':'101010011011','H':'110101001101','I':'101101001101','J':'101011001101','K':'110101010011','L':'101101010011','M':'110110101001','N':'101011010011','O':'110101101001','P':'101101101001','Q':'101010110011','R':'110101011001','S':'101101011001','T':'101011011001','U':'110010101011','V':'100110101011','W':'110011010101','X':'100101101011','Y':'110010110101','Z':'100110110101','-':'100101011011','.':'110010101101',' ':'100110101101','$':'100100100101','/':'100100101001','+':'100101001001','%':'101001001001','*':'100101101101'
  };
  function code39Svg(value){
    const clean = String(value||'').toUpperCase().replace(/[^0-9A-Z .\-$\/+%]/g,'-');
    const encoded = '*' + clean + '*';
    const unit = 2, narrow = 1, wide = 3, height = 58;
    let x = 8, bars = '';
    for(const ch of encoded){
      const pat = CODE39[ch] || CODE39['-'];
      for(let i=0;i<pat.length;i++){
        const w = (pat[i]==='1'?wide:narrow)*unit;
        if(i % 2 === 0) bars += `<rect x="${x}" y="6" width="${w}" height="${height}"/>`;
        x += w;
      }
      x += narrow * unit;
    }
    const width = x + 8;
    return `<svg class="ptw-code39" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 92" role="img" aria-label="Barcode ${clean}"><rect width="${width}" height="92" fill="#fff"/>${bars}<text x="${width/2}" y="84" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">${clean}</text></svg>`;
  }
  function submissionKey(sub){return String((sub && (sub.id || sub.submission_id)) || '').trim() || String(Date.now());}
  function reportIdFromSubmission(sub){return 'PTW-SR-2027-' + md5(submissionKey(sub)).slice(0,12).toUpperCase();}
  function certificateSerialFromReport(reportId){return 'PTW-CERT-2027-' + md5(String(reportId||'')).slice(0,10).toUpperCase();}
  function officialUrl(params){const u = new URL(OFFICIAL_BASE);Object.entries(params||{}).forEach(([k,v])=>{if(v!==undefined&&v!==null&&String(v)!=='')u.searchParams.set(k,String(v));});return u.toString();}
  function scoreUrl(reportId){return officialUrl({verify:'score',report:reportId});}
  function certificateUrl(serial){return officialUrl({verify:'certificate',cert:serial});}
  function qrImgUrl(url,size){return 'https://api.qrserver.com/v1/create-qr-code/?size='+(size||180)+'x'+(size||180)+'&data='+encodeURIComponent(url);}
  window.PTW_VERIFY_TOOLS = { OFFICIAL_BASE, md5, code39Svg, reportIdFromSubmission, certificateSerialFromReport, scoreUrl, certificateUrl, qrImgUrl };
})();
