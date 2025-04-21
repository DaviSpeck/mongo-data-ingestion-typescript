import pandas as pd

df = pd.read_parquet('C:/Users/davispeck/Documents/Trabalho/CAPES/Projetos Organizados/extração-joao/HISTORICO_PROCESSO__1.parquet')

print(df.dtypes)

print(df.head())