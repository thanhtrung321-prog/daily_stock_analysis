# -*- coding: utf-8 -*-
"""Regression tests for multi-market review region narrowing."""

import unittest

from src.core.trading_calendar import compute_effective_region


class TradingCalendarMarketReviewRegionTestCase(unittest.TestCase):
    def test_compute_effective_region_both_expands_to_all_three_markets(self) -> None:
        self.assertEqual(
            compute_effective_region("both", {"cn", "hk", "us"}),
            "cn,hk,us",
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

    def test_compute_effective_region_hk_keeps_direct_single_market_mode(self) -> None:
        self.assertEqual(
            compute_effective_region("hk", {"hk"}),
            "hk",
        )


if __name__ == "__main__":
    unittest.main()
