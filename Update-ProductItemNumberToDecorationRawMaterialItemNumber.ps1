$Credential = Get-TervisPasswordstatePassword -Guid 28c21f8f-1404-49d7-99b2-0b601e44a49f -AsCredential
$AzureCredential = Get-TervisPasswordstatePassword -Guid db1d47c7-4cac-4f19-ae50-b0d887e44407 -AsCredential

$ItemBomData = Invoke-MSSQL -Server sql.tervis.prv -Database mes -SQLCommand @"
select ITEM_NUM, COMPONENT_ITEM_NUMBER from [MES].[dbo].[ItemBOM] (nolock)
where 
(
    COMPONENT_ITEM_NUMBER is not null AND
    COMPONENT_ITEM_NUMBER in (
        select ITEM_NUMBER 
        from [MES].[dbo].[Items] (nolock)
        where 
        ITEM_NUMBER is not null 
        AND INV_PROD_GROUP_CODE in ('DECORATION','CUS DECORATION')
        AND ITEM_STATUS_CODE = 'Active'
    )
)
AND (
    ITEM_NUM in (
        select ITEM_NUMBER 
        from [MES].[dbo].[Items] (nolock)
        where 
        ITEM_NUMBER is not null
        AND CUP_COUNT = '1'
        AND ITEM_STATUS_CODE = 'Active'
        AND ORDERS_ENABLED_FLAG = '1'
        AND DESIGN_GROUP != 'CUSTOM'
    )
)
"@ -Credential $Credential -ConvertFromDataRow

$ItemBomData |
# Select-Object -First 10 |
Group-Object -Property ITEM_NUM |
Where-Object -Property Count -eq 1 |
Select-Object -ExpandProperty Group |
New-HashTableIndex -PropertyToIndex ITEM_NUM -ProeprtyToUseAsSingleValue COMPONENT_ITEM_NUMBER |
ConvertTo-Json -Compress |
Out-File -FilePath ProductItemNumberToDecorationRawMaterialItemNumber.json

Connect-AzAccount -Credential $AzureCredential -Tenant "5a61218a-b04f-4c5e-863f-95d65f6c0293" -Subscription "8b3835b7-ddd8-41fc-9ee1-297bfe67e2a3"