import pandas as pd
import os

file_path = "C:/Users/davispeck/Documents/Trabalho/CAPES/Projetos Organizados/extração-joao/HISTORICO_PROCESSO__1.parquet"

df = pd.read_parquet(file_path)

output_dir = os.path.dirname(file_path)

chunk_size = 5000
chunks = [df[i:i+chunk_size] for i in range(0, len(df), chunk_size)]

for idx, chunk in enumerate(chunks):
    chunk_file_path = os.path.join(output_dir, f"chunk_{idx+1}.parquet")
    chunk.to_parquet(chunk_file_path, index=False)
    print(f"✔️ Chunk salvo: {chunk_file_path}")