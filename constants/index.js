import { Search, Home, Heart, UserPlus, Music, Image, Disc, Radio, FileText, PlusSquare } from "lucide-react";
//侧边栏遍历
export const sidebarLinks = [
  {
    imgURL: Home,
    route: "/",
    label: "Home",
  },
  {
    imgURL: Music,
    route: "/musicGenerator",
    label: "MusicGenerator",
  },
  {
    imgURL: Image,
    route: "/imageGenerator",
    label: "ImageGenerator",
  },
];

// 音乐生成器侧边栏链接
export const musicSidebarLinks = [
  {
    id: 'inspiration',
    icon: Music,
    label: '生成音乐',
    route: '/musicGenerator',
  },
  // {
  //   id: 'custom',
  //   icon: Disc,
  //   label: '自定义音乐',
  //   route: '/musicGenerator/custom',
  // },
  // {
  //   id: 'radio',
  //   icon: Radio,
  //   label: '纯音乐',
  //   route: '/musicGenerator/radio',
  // },
  // {
  //   id: 'lyrics',
  //   icon: FileText,
  //   label: '音乐歌词',
  //   route: '/musicGenerator/lyrics',
  // },
  {
    id: 'myGenerates',
    icon: PlusSquare,
    label: '查看我的生成',
    route: '/musicGenerator/myGenerate',
  }
];
