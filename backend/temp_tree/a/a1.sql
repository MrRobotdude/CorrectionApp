USE Saravia_Pen
GO

-- 1.
SELECT sh.CustomerID, 
	CustomerName, 
	SalesTransactionDate, 
	[Quantity] = sd.SalesQuantity
FROM MsSalesHeader sh
JOIN MsSalesDetail sd
ON sh.SalesID = sd.SalesID
JOIN MsCustomer c
ON sh.CustomerID = c.CustomerID
WHERE DAY(SalesTransactionDate) = 25 AND
	sd.PenID LIKE 'PEN009'

--2.
SELECT PenID,
	PenName,
	[Total of Pen Material] = COUNT(pd.MaterialID)
FROM MsPurchaseDetail pd
JOIN MsPenMaterial m
ON pd.MaterialID = m.MaterialID
JOIN MsPen p
ON m.MaterialID = p.MaterialID
WHERE PenName LIKE 'Milky%'
GROUP BY PenID, PenName
HAVING COUNT(pd.MaterialID) >= 6

-- 3.
SELECT CustomerName,
	[Sales Transaction Date] = CONVERT(VARCHAR, SalesTransactionDate, 102),
	[Total Pen Type] = COUNT(sd.PenID),
	[Total Quantity] = SUM(SalesQuantity)
FROM MsSalesHeader sh
JOIN MsCustomer c
ON sh.CustomerID = c.CustomerID
JOIN MsSalesDetail sd
ON sh.SalesID = sd.SalesID
WHERE MONTH(SalesTransactionDate) = 9
GROUP BY CustomerName, SalesTransactionDate
HAVING SUM(SalesQuantity) > 10

--4.
SELECT StaffName,
	[Staff Gender] = LEFT(StaffGender, 1),
	CustomerName,
	[Total Sales Transaction] = COUNT(sh.SalesTransactionDate)
FROM MsSalesHeader sh
JOIN MsSalesDetail sd
ON sh.SalesID = sd.SalesID
JOIN MsStaff s
ON sh.StaffID = s.StaffID
JOIN MsCustomer c
ON sh.CustomerID = c.CustomerID
WHERE DAY(SalesTransactionDate) % 2 = 0
GROUP BY StaffName, StaffGender, CustomerName
HAVING SUM(sd.SalesQuantity) <= 10

--5.
SELECT DISTINCT [CustomerName] = UPPER(CustomerName),
	CustomerGender,
	[SalesTransactionId] = sh.SalesID
FROM MsSalesHeader sh
JOIN MsSalesDetail sd
ON sh.SalesID = sd.SalesID
JOIN MsCustomer c
ON sh.CustomerID = c.CustomerID
,(
	SELECT [average] = AVG(SalesQuantity) FROM MsSalesDetail 
) AS alias
WHERE DAY(SalesTransactionDate) = 25 AND
	SalesQuantity > alias.average 

--6.
SELECT VendorName,
	[PurchaseDate] = CONVERT(VARCHAR, PurchaseTransactionDate, 7),
	[MaterialName] = LOWER(MaterialName)
FROM MsPurchaseHeader ph
JOIN MsPurchaseDetail pd
ON ph.PurchaseID = pd.PurchaseID
JOIN MsVendor v
ON ph.VendorID = v.VendorID
JOIN MsPenMaterial m
ON pd.MaterialID = m.MaterialID
,(SELECT [average] = AVG(MaterialPrice) FROM MsPenMaterial
)AS alias
WHERE MaterialPrice > alias.average AND
	VendorName LIKE '%Industry'

--7.
SELECT [Total Purchase Transaction] = CONVERT(VARCHAR, COUNT(ph.PurchaseID)) + ' Transacntion(s)',
	VendorName,
	[Staff Name] = SUBSTRING(StaffName, 0, CHARINDEX(' ', StaffName)),
	PurchaseTransactionDate
FROM MsPurchaseHeader ph
JOIN MsPurchaseDetail pd
ON ph.PurchaseID = pd.PurchaseID
JOIN MsVendor v
ON ph.VendorID = v.VendorID
JOIN MsStaff s
ON ph.StaffID = s.StaffID
,(SELECT [average] = AVG(PurchaseQuantity) FROM MsPurchaseDetail
)AS alias
WHERE PurchaseQuantity < alias.average AND
	DATENAME(WEEKDAY, PurchaseTransactionDate) LIKE 'Sunday'
GROUP BY VendorName, StaffName, PurchaseTransactionDate

--8.
SELECT VendorName,
	[Transaction Date] = CONVERT(VARCHAR, ph.PurchaseTransactionDate, 106),
	[PenMaterialName] = MaterialName,
	[Material Number] = REPLACE(pd.MaterialID, 'PML', 'PM')
FROM MsPurchaseHeader ph
JOIN MsPurchaseDetail pd
ON ph.PurchaseID = pd.PurchaseID
JOIN MsVendor v
ON ph.VendorID = v.VendorID
JOIN MsPenMaterial m
ON pd.MaterialID = m.MaterialID
,(SELECT [average] = AVG(MaterialStock) FROM MsPenMaterial
)AS alias1
,(SELECT [total price] = SUM(PurchaseQuantity * MaterialPrice),
	a.PurchaseID
	FROM MsPurchaseDetail a
	JOIN MsPenMaterial b
	ON a.MaterialID = b.MaterialID
	GROUP BY a.PurchaseID
)AS alias2
WHERE MaterialStock > alias1.average AND
alias2.[total price] > 500000 AND
ph.PurchaseID = alias2.PurchaseID
ORDER BY VendorName DESC

--9.
GO;
CREATE VIEW ViewSalesTransaction
AS
	SELECT StaffName,
		CustomerName,
		[Total Sales Transaction] = COUNT(sd.SalesID),
		[Maximum Sales] = MAX(SalesQuantity)
	FROM MsSalesHeader sh
	JOIN MsSalesDetail sd
	ON sh.SalesID = sd.SalesID
	JOIN MsStaff s
	ON sh.StaffID = s.StaffID
	JOIN MsCustomer c
	ON sh.CustomerID = c.CustomerID
	WHERE CustomerName LIKE '%c%'
	GROUP BY StaffName, CustomerName
	HAVING COUNT(sd.SalesID) > 2

GO;
SELECT * FROM ViewSalesTransaction

--10.
GO;
CREATE VIEW ViewPurchaseDetail
AS
	SELECT VendorName,
		[Total Purchase Quantity] = SUM(PurchaseQuantity),
		[Total Purchase Transaction] = COUNT(pd.PurchaseID)
	FROM MsPurchaseHeader ph
	JOIN MsPurchaseDetail pd
	ON ph.PurchaseID = pd.PurchaseID
	JOIN MsVendor v
	ON ph.VendorID = v.VendorID
	JOIN MsStaff s
	ON ph.StaffID = s.StaffID
	WHERE StaffGender LIKE 'Male'
	GROUP BY VendorName
	HAVING COUNT(ph.PurchaseID) > 1

GO;
SELECT * FROM ViewPurchaseDetail