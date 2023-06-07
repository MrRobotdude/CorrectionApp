
USE GymShop
--1
CREATE TABLE MsPaymentType
(PaymentTypeId CHAR(5), PaymentTypeName VARCHAR(10),PaymentTypeDescription VARCHAR(255))
--2
SELECT * FROM MsEquipment
ALTER TABLE MsEquipment 
ADD EquipmentBrand VARCHAR(100) 
WHERE EquipmentPrice BETWEEN 10000 and 50000000
--3
SELECT * FROM MsCustomer

INSERT INTO MsCustomer (CustomerID, CustomerName, CustomerEmail, CustomerAddress, CustomerGender, CustomerDOB) VALUES 
('CU006', 'NamJooHyuk', 'namjoohyuk@mail.com', 'Sand Street no 11 West Jakarta', 'Female','2/10/1992')

--5
UPDATE MsCustomer
SET CustomerName = CustomerName + 1 
WHERE CustomerDOB = month 12
