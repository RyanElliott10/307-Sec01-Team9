export default class RecImages {

  static getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
  
  static getImages() {
    const urls = [
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.BoJrw7ZTsn_RivOHS5aHhQHaKX%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F48tk9j3a74jb133e1k2fzz2s-wpengine.netdna-ssl.com%2Fwp-content%2Fuploads%2F2015%2F11%2FKuhnhenn-Raspberry-Eisbock-2014-bottle.jpg&f=1&nofb=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsystembevakningsagenten.se%2Fimages%2Fproduct%2Fid%2F5613.jpg&f=1&nofb=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.beergonzo.co.uk%2Fpictures%2F40294761-3ac9-405d-a0bf-1aaf0c5a5074.jpg&f=1&nofb=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.CcvM_nm2eeKiNjDf7AS9PwHaHa%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F5283de1be4b02eec9fd8680c%2F1559605063526-KZO7FSIKOIABN6PQABZC%2Fke17ZwdGBToddI8pDm48kFnT2OKXDfAlTBWdP5osHV57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmCZdxe8RUVMtthf0J1VwZ7mZffuBZ0rRgL__rP736U4iIwjl6Xi0nv2Hh9peADZzP%2FSideProject_LangstB2_750ml_WHT.jpg&f=1&nofb=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F1298%2F8705%2Fproducts%2Fkees_doubleshot_grande.png%3Fv%3D1555639009&f=1&nofb=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.F1sCgA9IXlYzS-mm7jilAgHaKy%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.justwineapp.com%2Fassets%2Farticle%2F2018%2F03%2Fsteel-oak-brewing-co-roggen-weizen_1476892885.png&f=1&nofb=1"
    ];

    return this.getRandom(urls, 5);
  }
}
