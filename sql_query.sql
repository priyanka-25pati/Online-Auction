use Auction;

CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    AuthToken NVARCHAR(255),
);

CREATE TABLE Categories (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(255) NOT NULL,
    ParentCategoryID INT
);

CREATE TABLE Items (
    ItemID INT IDENTITY(1,1) PRIMARY KEY,
    SellerID INT NOT NULL,
    CategoryID INT NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    StartingBid DECIMAL(10,  2) NOT NULL,
    ReservePrice DECIMAL(10,  2),
    AuctionDuration INT NOT NULL,
    StartTime DATETIME NOT NULL,
    EndTime DATETIME NOT NULL,
    Status NVARCHAR(50) NOT NULL DEFAULT 'active'
);

ALTER TABLE Items
ADD Image NVARCHAR(MAX);

Select *from Items;
ALTER TABLE Items DROP COLUMN Image;


CREATE TABLE Bids (
    BidID INT IDENTITY(1,1) PRIMARY KEY,
    ItemID INT NOT NULL,
    BidderID INT NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    Timestamp DATETIME NOT NULL DEFAULT GETDATE(),

);


CREATE TABLE Auctions (
    AuctionID INT IDENTITY(1,1) PRIMARY KEY,
    ItemID INT NOT NULL,
    CurrentHighestBid DECIMAL(10,  2) NOT NULL,
    CurrentHighestBidderID INT NOT NULL
);


CREATE TABLE Payments (
    PaymentID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    ItemID INT NOT NULL,
    PaymentMethod NVARCHAR(255) NOT NULL,
    TransactionID NVARCHAR(255),
    Amount DECIMAL(10,  2) NOT NULL,
    Status NVARCHAR(50) NOT NULL DEFAULT 'pending',
    CreatedAt DATETIME DEFAULT GETDATE(),
);


CREATE TABLE Notifications (
    NotificationID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    Message NVARCHAR(MAX) NOT NULL,
    ReadStatus NVARCHAR(50) NOT NULL DEFAULT 'unread',

);

CREATE TABLE UserDashboard (
    DashboardID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    WatchedItems NVARCHAR(MAX),
    Bids NVARCHAR(MAX),
    PurchasedItems NVARCHAR(MAX),
    SellingActivities NVARCHAR(MAX),
);
CREATE TABLE Admins (
  AdminID INT IDENTITY(1,1) PRIMARY KEY,
    AdminName NVARCHAR(255) NOT NULL,
      Email NVARCHAR(255) NOT NULL UNIQUE,
    Password NVARCHAR(255) NOT NULL,
);




DROP TABLE Categories;
DROP TABLE UserDashboard;
DROP TABLE Payments;
DROP TABLE Notifications;


TRUNCATE TABLE Admins;

ALTER TABLE Admins
ADD AdminID INT IDENTITY(1,1) PRIMARY KEY,
AdminName NVARCHAR(255) NOT NULL;




Select *from Auctions;
INSERT INTO Admins (Email, Password, AdminName) VALUES ('admin1@example.com', 'hashed_password_1', 'Admin One');
INSERT INTO Admins (Email, Password, AdminName) VALUES ('admin2@example.com', 'hashed_password_2', 'Admin Two');
INSERT INTO Admins (Email, Password, AdminName) VALUES ('admin3@example.com', 'hashed_password_3', 'Admin Three');



--INSERT INTO Items (SellerID, CategoryID, Title, Description, StartingBid, ReservePrice, AuctionDuration, StartTime, EndTime)
--VALUES (123, 456, 'Example Item', 'This is an example item description.', 50.00, NULL, 7, '2024-02-28 09:00:00', '2024-03-06 09:00:00');
Select *from Items;

INSERT INTO Bids ( ItemID, BidderID,Amount, Timestamp)
VALUES (5, 1, 1000, '2024-03-02 14:00:00');

INSERT INTO Bids ( ItemID, BidderID,Amount, Timestamp)
VALUES (7, 2, 1000, '2024-03-02 14:00:00');

Select *from Items;
DROP TABLE Auctions;



INSERT INTO Users (Username, Email, PasswordHash)
VALUES ('JohnDoe', 'john.doe@example.com', 'hashedPasswordHere');
Select *from Bids;


EXEC sp_rename 'Admins.PasswordHash', 'Password', 'COLUMN';


DELETE FROM Bids;




ALTER TABLE Items
DROP COLUMN CreatedAt;


ALTER TABLE Items
DROP COLUMN CreatedAt;

ALTER TABLE Items
DROP COLUMN UpdatedAt;


ALTER TABLE Items
DROP CONSTRAINT DF__Items__UpdatedAt__2D27B809;
ALTER TABLE Items
DROP COLUMN UpdatedAt;

ALTER TABLE Items DROP COLUMN CreatedAt;
ALTER TABLE Items DROP COLUMN UpdatedAt;





TRUNCATE TABLE Admins;
INSERT INTO Admins (AdminName, Email, Password) VALUES ('Admin One', 'admin1@example.com', 'hashed_password_1');
INSERT INTO Admins (AdminName, Email, Password) VALUES ('Admin Two', 'admin2@example.com', 'hashed_password_2');
INSERT INTO Admins (AdminName, Email, Password) VALUES ('Admin Three', 'admin3@example.com', 'hashed_password_3');
INSERT INTO Admins (AdminName, Email, Password) VALUES ('Priyanka', 'pati@example.com', 'pati');

Select * from Admins;

Select *from Users;