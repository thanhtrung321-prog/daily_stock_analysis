type SkillLike = {
  id: string;
  name: string;
  description: string;
};

type SkillText = {
  name: string;
  description: string;
};

const VI_SKILL_TEXT: Record<string, SkillText> = {
  bull_trend: {
    name: 'Xu hướng tăng mặc định',
    description:
      'Bộ quy tắc xu hướng tăng mặc định dựa trên MA5/MA10/MA20, giá, khối lượng và quản trị rủi ro.',
  },
  ma_golden_cross: {
    name: 'Giao cắt vàng MA',
    description:
      'Phát hiện tín hiệu MA ngắn hạn cắt lên MA trung hạn, có xác nhận bởi khối lượng.',
  },
  volume_breakout: {
    name: 'Bứt phá kèm thanh khoản',
    description:
      'Theo dõi giá vượt kháng cự với khối lượng tăng để xác nhận lực mua.',
  },
  shrink_pullback: {
    name: 'Hồi kiểm thanh khoản thấp',
    description:
      'Tìm nhịp hồi kiểm MA hoặc vùng hỗ trợ với khối lượng thu hẹp trong xu hướng tăng.',
  },
  box_oscillation: {
    name: 'Dao động trong hộp',
    description:
      'Giao dịch trong vùng hỗ trợ và kháng cự rõ, ưu tiên mua gần đáy hộp và chốt gần đỉnh hộp.',
  },
  bottom_volume: {
    name: 'Tăng thanh khoản vùng đáy',
    description:
      'Nhận diện tín hiệu đảo chiều tiềm năng khi cổ phiếu giảm dài rồi xuất hiện khối lượng lớn ở vùng đáy.',
  },
  chan_theory: {
    name: 'Lý thuyết Chan',
    description:
      'Dựa trên bút, đoạn, trung tâm và phân kỳ của Chan để đánh giá cấp độ xu hướng và điểm mua bán.',
  },
  wave_theory: {
    name: 'Sóng Elliott',
    description:
      'Đánh giá cấu trúc sóng đẩy và sóng điều chỉnh để xác định vị trí hiện tại và vùng mục tiêu.',
  },
  dragon_head: {
    name: 'Cổ phiếu dẫn dắt',
    description:
      'Tìm cổ phiếu dẫn dắt ngành hoặc chủ đề có sức mạnh tương đối và dòng tiền nổi bật.',
  },
  emotion_cycle: {
    name: 'Chu kỳ tâm lý thị trường',
    description:
      'Theo dõi giai đoạn cảm xúc, độ nóng chủ đề và tín hiệu hạ nhiệt của dòng tiền.',
  },
  one_yang_three_yin: {
    name: 'Một nến dương kẹp ba nến âm',
    description:
      'Nhận diện mẫu hình một nến tăng đi kèm nhịp điều chỉnh ba nến âm, dùng làm tín hiệu tiếp diễn cần xác nhận.',
  },
};

const CHINESE_SKILL_NAME_TO_ID: Record<string, string> = {
  默认多头趋势: 'bull_trend',
  均线金叉: 'ma_golden_cross',
  放量突破: 'volume_breakout',
  缩量回踩: 'shrink_pullback',
  箱体震荡: 'box_oscillation',
  底部放量: 'bottom_volume',
  缠论: 'chan_theory',
  波浪理论: 'wave_theory',
  龙头策略: 'dragon_head',
  情绪周期: 'emotion_cycle',
  一阳夹三阴: 'one_yang_three_yin',
};

export const localizeSkillInfo = <T extends SkillLike>(skill: T): T => {
  const localized = VI_SKILL_TEXT[skill.id] ?? VI_SKILL_TEXT[CHINESE_SKILL_NAME_TO_ID[skill.name]];
  if (!localized) {
    return skill;
  }
  return {
    ...skill,
    name: localized.name,
    description: localized.description,
  };
};
