// 歌手信息类
export class Singer {
  // 传入一个对象
  constructor({id, name}) {
    this.id = id;
    this.name = name;
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}

export function createSinger(item) {
  return new Singer({
    id: item.Fsinger_mid,
    name: item.Fsinger_name
  })
}
