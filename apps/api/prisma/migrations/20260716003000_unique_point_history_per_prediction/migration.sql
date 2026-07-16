-- Remove duplicate PointHistory rows (keep lowest id per pool/user/fixture)
DELETE ph1 FROM `PointHistory` ph1
INNER JOIN `PointHistory` ph2
  ON ph1.`poolId` = ph2.`poolId`
 AND ph1.`userId` = ph2.`userId`
 AND ph1.`fixtureId` = ph2.`fixtureId`
 AND ph1.`id` > ph2.`id`;

-- Drop non-unique composite index if it exists (replaced by unique)
DROP INDEX `PointHistory_poolId_userId_fixtureId_idx` ON `PointHistory`;

-- Enforce one score row per prediction target
CREATE UNIQUE INDEX `PointHistory_poolId_userId_fixtureId_key` ON `PointHistory`(`poolId`, `userId`, `fixtureId`);
