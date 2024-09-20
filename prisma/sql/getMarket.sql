-- @param {DateTime} $1:start_time
-- @param {DateTime} $2:end_time
WITH RankedMarket AS (
  SELECT m.update_time as "updateTime",
    m.market_time as "marketTime",
    m.price,
    m.increase,
    p.symbol,
    p.sname,
    p.exchange,
    p.position_cost,
    p.balance,
    m.id,
    ROW_NUMBER() OVER (
      PARTITION BY p.symbol
      ORDER BY m.update_time DESC
    ) as rn
  FROM market m
    JOIN position p ON m.symbol = p.symbol
  WHERE m.update_time >= $1
    AND m.update_time <= $2
)
SELECT "updateTime",
  "marketTime",
  price,
  increase,
  symbol,
  sname,
  exchange,
  position_cost as "positionCost",
  balance,
  id
FROM RankedMarket
WHERE rn = 1
ORDER BY symbol ASC;