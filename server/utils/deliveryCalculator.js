// 현재 주문 신청한 메뉴의 총 가격
export function getTotalOrderPrice(orders) {
  const totalOrderPrice = orders.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );
  return totalOrderPrice;
}

// 현재 주문 신청한 사람 수
export function getOrderedUserCount(orders) {
  if (orders.length <= 0) return 0;

  return Array.from(new Set(orders.map((order) => order.userId))).length;
}

// 적용되는 배달비 정보 구하기
export function getApplicableDeliveryFeeInfo(
  deliveryFeeInfos,
  totalOrderPrice
) {
  if (!deliveryFeeInfos || deliveryFeeInfos?.length <= 0) {
    return null;
  }

  // 1. 적용 가능한 금액 구간 filter
  const applicableDeliveryFees = deliveryFeeInfos.filter(
    (fee) =>
      totalOrderPrice >= fee.minAmount &&
      (fee.maxAmount === null || totalOrderPrice <= fee.maxAmount)
  );

  // 적용되는 구간이 없는 경우 모든 구간 중 가장 비싼 배달비로 적용
  if (applicableDeliveryFees.length <= 0) {
    const sortedDeliveryFeeInfos = deliveryFeeInfos.toSorted(
      (a, b) => b.fee - a.fee
    );
    return sortedDeliveryFeeInfos.at(0);
  }

  // 2. 적용되는 구간 중 배달요금 낮은 순서로 sort
  const sortedDeliveryFeeInfos = applicableDeliveryFees.toSorted(
    (a, b) => a.fee - b.fee
  );

  return sortedDeliveryFeeInfos.at(0);
}

// 1인당 배달비
export function getDeliveryFeePerPerson(
  appliedDeliveryFeeInfo,
  orderedUserCount
) {
  return Math.ceil(appliedDeliveryFeeInfo?.fee / (orderedUserCount || 1) || 0);
}

// 현재 적용된 배달비 정보의 다음 단계 배달비 정보구하기
export function getNextDeliveryFeeInfos(
  deliveryFeeInfos,
  currentDeliveryFeeInfo,
  totalOrderPrice
) {
  if (!deliveryFeeInfos || deliveryFeeInfos?.length <= 0) {
    return null;
  }

  // 1. 다음 금액 구간 중 현재 배달비보다 작은 조건 filter
  // 2. 최소금액조건 작은 순으로 sort
  const nextDeliveryFees = deliveryFeeInfos
    .filter(
      (info) =>
        info.minAmount > totalOrderPrice &&
        info.fee < currentDeliveryFeeInfo.fee
    )
    .toSorted((a, b) => a.fee - b.fee);

  return nextDeliveryFees.at(0) || null;
}

// 할인금액 구하기
export function calculateDiscount(discountInfo, price) {
  if (discountInfo === undefined) return 0;
  // 금액 할인인 경우
  if (discountInfo.discount !== null) {
    return Math.min(discountInfo.discount, price);
    // 퍼센트 할인인 경우
  } else if (discountInfo.discountRate !== null) {
    return Math.min(
      discountInfo.discountRate * price,
      discountInfo.maxDiscountAmount || price
    );
  }
  return 0;
}

// 적용되는 할인 정보 구하기
export function getAppliedDiscountInfo(deliveryDiscountInfos, totalOrderPrice) {
  if (deliveryDiscountInfos?.length <= 0) {
    return null;
  }

  // 1. 최소 금액 만족하는 할인 정보 filter
  // 2. 할인받을 수 있는 금액이 큰 순으로 sort
  const applicableDiscountInfos = deliveryDiscountInfos
    .filter((info) => totalOrderPrice > info.minAmount)
    .sort((a, b) => {
      const aDiscount = calculateDiscount(a, totalOrderPrice);
      const bDiscount = calculateDiscount(b, totalOrderPrice);
      return bDiscount - aDiscount;
    });

  return applicableDiscountInfos.at(0);
}

// 현재 적용된 할인 정보의 다음 단계 할인정보 구하기
export function getNextDiscountInfos(
  deliveryDiscountInfos,
  currentDiscountInfo,
  totalOrderPrice
) {
  // 할인 정보 자체가 없는 경우
  if (deliveryDiscountInfos?.length <= 0) {
    return null;
  }
  // 현재 적용된 할인정보가 없는 경우
  if (!currentDiscountInfo) {
    return deliveryDiscountInfos
      .sort((a, b) => a.minAmount - b.minAmount)
      .at(0);
  }
  // 1. 최소금액 조건이 현재 주문액보다 크면서 할인금액이 현재보다 큰 할인조건 filter
  // 2. 최소금액 작은순으로 sort
  const nextDiscountInfos = deliveryDiscountInfos
    .filter(
      (info) =>
        info.minAmount > totalOrderPrice &&
        calculateDiscount(info, totalOrderPrice) >
          calculateDiscount(currentDiscountInfo, totalOrderPrice)
    )
    .sort((a, b) => a.minAmount - b.minAmount);
  return nextDiscountInfos.at(0);
}
