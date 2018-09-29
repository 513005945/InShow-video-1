/**
 * mp2Url:播放的地址
 * album-poster:封面
 * album-name:所属专辑名字
 * artists:作者
 * name:歌曲名字
 */
const songs = {
  "363488": {
    "mp3Url": "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
    "poster": "http://p4.music.126.net/Frbn2mQ18NswoanBk-O1wg==/106652627910743.jpg",
    "artists": "零点",
    "name": "爱不爱我"
  },
  "186385": {
    "mp3Url": "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",

    "poster": "http://p4.music.126.net/ns4zt4X5JPRf42h5q4F7wA==/841126395248902.jpg",
    "artists": "张信哲",
    "name": "别怕我伤心"
  },
  "108251": {
    "mp3Url": "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",

    "poster": "http://p4.music.126.net/tUapZaR1iT5XTX2QcAc0DA==/96757023257715.jpg",
    "artists": "林俊杰",
    "name": "当你"
  },
  "29561525": {
    "mp3Url": "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",

    "poster": "http://p3.music.126.net/V3hjYhn2mX-bE6wlmC7k-Q==/6625657069944336.jpg",
    "artists": "Zella Day",
    "name": "Hypnotic"
  },
  "21151698": {
    "mp3Url": "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",

    "poster": "http://p3.music.126.net/rQ_71XNYnylminHeOVF2Vg==/2535473813685129.jpg",
    "artists": "Mika",
    "name": "Relax, Take It Easy"
  },
  "29544965": {
    "mp3Url": "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
    "poster": "http://p3.music.126.net/f0JDPVpryKc73gKlJx4adw==/7849413510777693.jpg",
    "artists": "庄心妍",
    "name": "好可惜"
  },
  "18449193": {
    "mp3Url": "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
    "poster": "http://p4.music.126.net/tV53_0aNGiXuhDMs3RQ70g==/2536573325601461.jpg",
    "artists": "Rosie Thomas",
    "name": "Say Hello"
  },
  "32272267": {
    "mp3Url": "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
    "poster": "http://p3.music.126.net/W-WHCe2sQK1MQ_ftE8oCcA==/7760353069698404.jpg",
    "artists": "燕池",
    "name": "人海 - 2015版"
  },
  "27583635": {
    "mp3Url": "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
    "poster": "http://p4.music.126.net/45Gvt2uxLyiKG2wwBA0OvQ==/2531075768525910.jpg",
    "artists": "Audrey Assad",
    "name": "You Speak"
  },
  "27808360": {
    "mp3Url": "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
    "poster": "http://p4.music.126.net/vAU1rvaSWvYW2VfwaF0jmg==/2155042790465911.jpg",
    "artists": "Emily Hearn",
    "name": "Darlin'"
  }
}

module.exports = {
  songs: songs
}