
import { ExamInfo, ScheduleItem, ExamDay, NoticeItem } from './types';

export const EXAM_DATE = "2027-04-24T08:00:00+08:00"; 
export const EXAM_END_DATE = "2027-04-25T17:40:00+08:00"; // 統測最後一節結束時間

export const EXAM_INFO: ExamInfo = {
  date: "2027年4月24日 (六) - 4月25日 (日)",
  title: "116 學年度四技二專統一入學測驗",
  description: "統測倒數，為夢想而戰！"
};

export const STATIONERY_GUIDE: NoticeItem = {
  title: "應試文具清單",
  items: [
    "黑色 2B 軟心鉛筆",
    "黑色墨水的筆",
    "橡皮擦、修正液(帶)",
    "圓規、直尺、三角板、量角器",
    "透明墊板、文具盒(袋)"
  ],
  warning: "提醒：文具不可有考試相關文字或符號(如公式、函數圖形)，建議攜帶透明墊板與文具盒。"
};

export const PROHIBITED_ITEMS: NoticeItem = {
  title: "不可攜帶入座物品",
  items: [
    "計算機、計算紙、文宣品",
    "耳機類、多媒體播放器 (如 MP3, MP4)",
    "通訊、拍照、錄影裝置 (手機、穿戴式裝置)",
    "具 GPS、錄音、傳輸功能之電子設備",
    "教科書、參考書、電子辭典"
  ],
  warning: "考生如需佩戴助聽器，應事先持證明文件申請並配合檢查。"
};

export const EXAM_PRECAUTIONS: string[] = [
  "注意身體健康，考前避免出入公共場所，維持正常作息。",
  "當天務必備妥准考證與文具，提早出門評估考場交通時間。",
  "因應傳染疾病，考生可自主佩戴口罩應試。",
  "詳細規範請參閱 116 統測簡章及測驗中心網站公告。"
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  { 
    event: "簡章公告與發售", 
    date: "2026年11月上旬", 
    isoDate: "2026-11-01T00:00:00+08:00",
    isConfirmed: false,
    category: 'admission'
  },
  { 
    event: "統測報名開始", 
    date: "2026年12月上旬", 
    isoDate: "2026-12-10T00:00:00+08:00",
    isConfirmed: false,
    category: 'exam'
  },
  { 
    event: "准考證開放查詢與下載", 
    date: "2027年4月中旬", 
    isoDate: "2027-04-15T00:00:00+08:00",
    isConfirmed: false,
    category: 'exam'
  },
  { 
    event: "116 統一入學測驗考試", 
    date: "2027年4月24日 - 4月25日", 
    isoDate: "2027-04-24T00:00:00+08:00",
    isConfirmed: true,
    category: 'exam'
  },
  { 
    event: "統測成績公佈", 
    date: "2027年5月中旬", 
    isoDate: "2027-05-20T00:00:00+08:00",
    isConfirmed: false,
    category: 'result'
  },
  { 
    event: "甄選入學第一階段報名", 
    date: "2027年5月下旬", 
    isoDate: "2027-05-25T00:00:00+08:00",
    isConfirmed: false,
    category: 'admission'
  },
  { 
    event: "登記分發志願選填", 
    date: "2027年7月下旬", 
    isoDate: "2027-07-20T00:00:00+08:00",
    isConfirmed: false,
    category: 'admission'
  },
];

export const EXAM_TIMETABLE: ExamDay[] = [
  {
    date: "2027年4月24日",
    dayOfWeek: "星期六",
    sessions: [
      {
        sessionTitle: "上午第1節",
        prepTime: "10:15",
        examTime: "10:20-12:00",
        subject: "專業科目（二）",
        categoryCodes: "03、07、12、15、51～53、55～56"
      },
      {
        sessionTitle: "下午第2節",
        prepTime: "13:25",
        examTime: "13:30-15:10",
        subject: "國文",
        categoryCodes: "01～20、51～56"
      },
      {
        sessionTitle: "下午第3節",
        prepTime: "15:55",
        examTime: "16:00-17:40",
        subject: "英文",
        categoryCodes: "01～20、51～56"
      }
    ]
  },
  {
    date: "2027年4月25日",
    dayOfWeek: "星期日",
    sessions: [
      {
        sessionTitle: "上午第1節",
        prepTime: "08:25",
        examTime: "08:30-10:10",
        subject: "專業科目（二）",
        categoryCodes: "01～02、04～06、08～11、13～14、17～20、51～54、56"
      },
      {
        sessionTitle: "上午第2節",
        prepTime: "10:55",
        examTime: "11:00-12:20",
        subject: "數學",
        categoryCodes: "01～20、51～56"
      },
      {
        sessionTitle: "下午第3節",
        prepTime: "13:25",
        examTime: "13:30-15:10",
        subject: "專業科目（一）",
        categoryCodes: "01～20、51～56"
      },
      {
        sessionTitle: "下午第4節",
        prepTime: "15:55",
        examTime: "16:00-17:40",
        subject: "專業科目（二）",
        categoryCodes: "16、54～56"
      }
    ]
  }
];
