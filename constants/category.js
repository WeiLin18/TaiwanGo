import { colors } from "styles";

export const CATEGORY_TYPES = {
  SCENICSPOT: "ScenicSpot",
  RESTAURANT: "Restaurant",
  ACTIVITY: "Activity",
};

export const CATEGORY_TYPES_LIST = [
  { name: "景點", value: CATEGORY_TYPES.SCENICSPOT },
  { name: "美食", value: CATEGORY_TYPES.RESTAURANT },
  { name: "活動", value: CATEGORY_TYPES.ACTIVITY },
];

export const CLASS_TYPES_LIST = [
  { value: "景點類", chipColor: colors.yellow },
  { value: "遊憩類", chipColor: colors.greenAlly },
  { value: "自然風景類", chipColor: colors.blueA11y },
  { value: "溫泉類", chipColor: colors.blueA11y },
];

export const CATEGORY_LOCATIONS_LIST = [
  { name: "全台灣", value: "All", position: [25.0220288, 121.482976] },
  { name: "臺北市", value: "Taipei", position: [25.0380288, 121.5102976] },
  {
    name: "新北市",
    value: "NewTaipei",
    position: [25.012059, 121.46256],
  },
  {
    name: "桃園市",
    value: "Taoyuan",
    position: [24.9892101, 121.3135375976562] /** @TODO API return [],check */,
  },
  { name: "臺中市", value: "Taichung", position: [24.15168, 120.66965] },
  { name: "臺南市", value: "Tainan", position: [22.9970852, 120.2097891] },
  { name: "高雄市", value: "Kaohsiung", position: [22.6394973, 120.3003943] },
  { name: "基隆市", value: "Keelung", position: [25.1330651, 121.7370653] },
  { name: "新竹市", value: "Hsinchu", position: [24.800553, 120.988573] },
  {
    name: "新竹縣",
    value: "HsinchuCounty",
    position: [24.700088, 121.0572128],
  },
  { name: "苗栗縣", value: "MiaoliCounty", position: [24.54567, 121.03048] },
  { name: "彰化縣", value: "ChanghuaCounty", position: [24.0785102, 120.5557] },
  { name: "南投縣", value: "NantouCounty", position: [23.790918, 120.95092] },
  { name: "雲林縣", value: "YunlinCounty", position: [23.54412, 120.18588] },
  { name: "嘉義縣", value: "ChiayiCounty", position: [23.49103, 120.72036] },
  { name: "嘉義市", value: "Chiayi", position: [23.48109, 120.467491] },
  { name: "屏東縣", value: "PingtungCounty", position: [22.45586, 120.479537] },
  {
    name: "宜蘭縣",
    value: "YilanCounty",
    position: [24.87118, 121.8355] /** @TODO API return [],check */,
  },
  { name: "花蓮縣", value: "HualienCounty", position: [23.488208, 121.4017] },
  {
    name: "臺東縣",
    value: "TaitungCounty",
    position: [22.80014398, 121.095531],
  },
  {
    name: "金門縣",
    value: "KinmenCounty",
    position: [24.43152, 118.317733] /** @TODO API return [],check */,
  },
  { name: "澎湖縣", value: "PenghuCounty", position: [23.73024, 119.6024] },
  {
    name: "連江縣",
    value: "LienchiangCounty",
    position: [26.20531, 119.968803],
  },
];
