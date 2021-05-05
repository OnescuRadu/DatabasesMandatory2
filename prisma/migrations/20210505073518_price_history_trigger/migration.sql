-- Create the trigger for seller products -> price history

CREATE TRIGGER record_price_change
BEFORE UPDATE ON SellerToProducts
FOR EACH ROW
    INSERT INTO PriceHistory(sellerProductId, oldPrice, newPrice, oldSalePrice, newSalePrice)
    VALUES (OLD.id, OLD.originalPrice, NEW.originalPrice, OLD.salePrice, NEW.salePrice);