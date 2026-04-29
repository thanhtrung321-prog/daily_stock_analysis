# -*- coding: utf-8 -*-
"""User-facing localization helpers for built-in trading skills."""

from __future__ import annotations

from typing import Dict, Tuple

from src.report_language import normalize_report_language


_VI_SKILL_TEXT: Dict[str, Dict[str, str]] = {
    "bull_trend": {
        "name": "Xu hướng tăng mặc định",
        "description": (
            "Bộ quy tắc xu hướng tăng mặc định dựa trên MA5/MA10/MA20, giá, "
            "khối lượng và quản trị rủi ro."
        ),
    },
    "ma_golden_cross": {
        "name": "Giao cắt vàng MA",
        "description": "Phát hiện tín hiệu MA ngắn hạn cắt lên MA trung hạn, có xác nhận bởi khối lượng.",
    },
    "volume_breakout": {
        "name": "Bứt phá kèm thanh khoản",
        "description": "Theo dõi giá vượt kháng cự với khối lượng tăng để xác nhận lực mua.",
    },
    "shrink_pullback": {
        "name": "Hồi kiểm thanh khoản thấp",
        "description": (
            "Tìm nhịp hồi kiểm MA hoặc vùng hỗ trợ với khối lượng thu hẹp trong xu hướng tăng."
        ),
    },
    "box_oscillation": {
        "name": "Dao động trong hộp",
        "description": (
            "Giao dịch trong vùng hỗ trợ và kháng cự rõ, ưu tiên mua gần đáy hộp và chốt gần đỉnh hộp."
        ),
    },
    "bottom_volume": {
        "name": "Tăng thanh khoản vùng đáy",
        "description": (
            "Nhận diện tín hiệu đảo chiều tiềm năng khi cổ phiếu giảm dài rồi xuất hiện khối lượng lớn ở vùng đáy."
        ),
    },
    "chan_theory": {
        "name": "Lý thuyết Chan",
        "description": (
            "Dựa trên bút, đoạn, trung tâm và phân kỳ của Chan để đánh giá cấp độ xu hướng và điểm mua bán."
        ),
    },
    "wave_theory": {
        "name": "Sóng Elliott",
        "description": (
            "Đánh giá cấu trúc sóng đẩy và sóng điều chỉnh để xác định vị trí hiện tại và vùng mục tiêu."
        ),
    },
    "dragon_head": {
        "name": "Cổ phiếu dẫn dắt",
        "description": "Tìm cổ phiếu dẫn dắt ngành hoặc chủ đề có sức mạnh tương đối và dòng tiền nổi bật.",
    },
    "emotion_cycle": {
        "name": "Chu kỳ tâm lý thị trường",
        "description": "Theo dõi giai đoạn cảm xúc, độ nóng chủ đề và tín hiệu hạ nhiệt của dòng tiền.",
    },
    "one_yang_three_yin": {
        "name": "Một nến dương kẹp ba nến âm",
        "description": (
            "Nhận diện mẫu hình một nến tăng đi kèm nhịp điều chỉnh ba nến âm, "
            "dùng làm tín hiệu tiếp diễn cần xác nhận."
        ),
    },
}

_SKILL_TEXT_BY_LANGUAGE = {
    "vi": _VI_SKILL_TEXT,
}


def localize_skill_summary(
    skill_id: str,
    name: str,
    description: str,
    language: str | None,
) -> Tuple[str, str]:
    """Return localized user-facing skill name and description when available."""
    language_code = normalize_report_language(language)
    localized = _SKILL_TEXT_BY_LANGUAGE.get(language_code, {}).get(skill_id)
    if not localized:
        return name, description
    return localized["name"], localized["description"]
