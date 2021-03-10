import pandas as pd
import json

#read Customers, DCs, Factories and Suppliers
customers=pd.read_excel(io='NOGlobalDistributionNetwork.xlsx',sheet_name='Customers')
factories=pd.read_excel(io='NOGlobalDistributionNetwork.xlsx',sheet_name='DCs and Factories')
suppliers=pd.read_excel(io='NOGlobalDistributionNetwork.xlsx',sheet_name='Suppliers')

#concatenate the Customers, DCs, Factories and Suppliers list
all=[customers[['Name','Type','Location']],factories[['Name','Type','Location']],suppliers[['Name','Type','Location']]]
allpd=pd.concat(all)

#read Locations
locations=pd.read_excel(io='NOGlobalDistributionNetwork.xlsx',sheet_name='Locations')
locations=locations[['Name','Latitude','Longitude']]
locations=locations.rename(columns={"Name": "Location"})

#merge Locations with the list
pd_with_loc=pd.merge(allpd, locations, how='left',left_on='Location', right_on='Location')


pd_with_loc.to_json('locations.json',orient="records")

pd_product_flow = pd.read_excel(io='Product Flows.xlsx', header = 4)
pd_product_flow = pd_product_flow[['From', 'To', 'Product', 'Flow', 'Unit', 'Distance']]

pd_product_flow_source_lat_long = pd.merge(pd_product_flow, pd_with_loc, how = 'left', left_on='From', right_on='Name')

pd_product_flow_source_lat_long=pd_product_flow_source_lat_long.rename(columns={"Name": "FromName","Type": "FromType", "Location": "FromLocation","Latitude": "FromLatitude","Longitude":"FromLongitude"})

pd_product_flow_lat_long = pd.merge(pd_product_flow_source_lat_long, pd_with_loc, how = 'left', left_on='To', right_on='Name')
pd_product_flow_lat_long = pd_product_flow_lat_long.rename(columns={"Name": "ToName","Type": "ToType", "Location": "ToLocation","Latitude": "ToLatitude","Longitude":"ToLongitude"})

pd_product_flow_lat_long.to_json('productflow.json',orient="records")