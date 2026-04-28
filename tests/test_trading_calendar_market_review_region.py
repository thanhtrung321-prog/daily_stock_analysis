# -*- coding: utf-8 -*-
"""Regression tests for multi-market review region narrowing."""

import unittest

from src.core.trading_calendar import compute_effective_region


class TradingCalendarMarketReviewRegionTestCase(unittest.TestCase):
    def test_compute_effective_region_both_keeps_all_three_markets(self) -> None:
        self.assertEqual(
            compute_effective_region("both", {"cn", "hk", "us"}),
            "both",
        )

    def test_compute_effective_region_both_can_narrow_to_cn_hk_subset(self) -> None:
        self.assertEqual(
            compute_effective_region("both", {"cn", "hk"}),
            "cn,hk",
        )

    def test_compute_effective_region_both_can_narrow_to_hk_only(self) -> None:
        self.assertEqual(
            compute_effective_region("both", {"hk"}),
            "hk",
        )


if __name__ == "__main__":
    unittest.main()
