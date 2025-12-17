Used the D365 Finance & Operations user interface to understand the fields users need in reporting and used the UI tools to discern the underlying tables, entities, forms, and SQL that presents those fields in the UI. Used that information to add more D365 system tables to SynapseLink for replication to Azure data lake. I manually researched and added more than 200 individual tables in this way. Used Argano’s AOT Browser tool to research relationships between tables. 

Lightly transformed raw (bronze) D365 system tables into SQL-friendly Silver layer tables in Fabric lakehouse using pyspark in Fabric notebooks. 
Meticulously reverse engineered D365 logic to create accurate, reporting-friendly Gold tables that combined multiple system tables into topics like InvoiceLine, InventoryOnHand, PurchaseOrderHeader, etc. 

Created Master layer tables in EDW (Enterprise Data Warehouse) Fabric Lakehouse to combine Gold layer topic tables across D365 and legacy ERP for topics like InvoiceLine, InventoryOnHand, PurchaseOrderHeader, etc to enable total-company reporting. 

Gathered requirements from stakeholders and collaborated with D365 developers to design and create dozens of reports and dashboards in Power BI using D365 data. These reports fulfilled SOX, accounting, audit, credit, operations, salesperson, management, AP, AR, and other personas’ needs that were not being met by the built-in D365 reports. Many of these reports combined data from multiple ERPs the give users a total company view and prevented the new ERP from slowing down their reporting processes. 
