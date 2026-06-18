#!/usr/bin/env python3
# insert_dynamodb.py — Insere os 12 jogos na tabela kickstream-jogos
# Rode na EC2 com: python3 insert_dynamodb.py

import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('kickstream-jogos')

jogos = [
    {
        "jogoId": "J001", "titulo": "Flamengo x Fluminense",
        "campeonato": "Campeonato Carioca", "data": "2025-03-15", "horario": "16:00",
        "time_casa": "Flamengo", "time_visitante": "Fluminense",
        "placar": "3 x 1", "status": "Disponível", "duracao_min": 110,
        "avaliacao": Decimal("4.8"),
        "descricao": "Clássico carioca válido pela fase de grupos do Cariocão 2025.",
        "url_thumb": "https://placehold.co/300x170/141414/00e676?text=FLA+x+FLU"
    },
    {
        "jogoId": "J002", "titulo": "Palmeiras x Corinthians",
        "campeonato": "Campeonato Paulista", "data": "2025-03-22", "horario": "18:30",
        "time_casa": "Palmeiras", "time_visitante": "Corinthians",
        "placar": "2 x 2", "status": "Disponível", "duracao_min": 113,
        "avaliacao": Decimal("4.9"),
        "descricao": "Dérbi paulista disputado na fase semifinal do Paulistão 2025.",
        "url_thumb": "https://placehold.co/300x170/141414/00e676?text=PAL+x+COR"
    },
    {
        "jogoId": "J003", "titulo": "Grêmio x Internacional",
        "campeonato": "Gauchão", "data": "2025-04-05", "horario": "16:00",
        "time_casa": "Grêmio", "time_visitante": "Internacional",
        "placar": "1 x 0", "status": "Disponível", "duracao_min": 108,
        "avaliacao": Decimal("4.7"),
        "descricao": "Grenal clássico gaúcho na fase de grupos do Gauchão 2025.",
        "url_thumb": "https://placehold.co/300x170/141414/00e676?text=GRE+x+INT"
    },
    {
        "jogoId": "J004", "titulo": "Atlético-MG x Cruzeiro",
        "campeonato": "Campeonato Mineiro", "data": "2025-04-12", "horario": "18:30",
        "time_casa": "Atlético-MG", "time_visitante": "Cruzeiro",
        "placar": "0 x 1", "status": "Disponível", "duracao_min": 106,
        "avaliacao": Decimal("4.6"),
        "descricao": "Clássico mineiro válido pela final do Campeonato Mineiro 2025.",
        "url_thumb": "https://placehold.co/300x170/141414/00e676?text=ATL+x+CRU"
    },
    {
        "jogoId": "J005", "titulo": "São Paulo x Santos",
        "campeonato": "Campeonato Paulista", "data": "2025-04-19", "horario": "16:00",
        "time_casa": "São Paulo", "time_visitante": "Santos",
        "placar": "2 x 0", "status": "Disponível", "duracao_min": 104,
        "avaliacao": Decimal("4.5"),
        "descricao": "Clássico paulista na fase de grupos do Paulistão 2025.",
        "url_thumb": "https://placehold.co/300x170/141414/00e676?text=SAO+x+SAN"
    },
    {
        "jogoId": "J006", "titulo": "Botafogo x Vasco",
        "campeonato": "Campeonato Carioca", "data": "2025-04-26", "horario": "18:30",
        "time_casa": "Botafogo", "time_visitante": "Vasco",
        "placar": "1 x 1", "status": "Disponível", "duracao_min": 112,
        "avaliacao": Decimal("4.4"),
        "descricao": "Clássico carioca entre Botafogo e Vasco na semifinal do Cariocão.",
        "url_thumb": "https://placehold.co/300x170/141414/00e676?text=BOT+x+VAS"
    },
    {
        "jogoId": "J007", "titulo": "Bahia x Vitória",
        "campeonato": "Campeonato Baiano", "data": "2025-05-03", "horario": "16:00",
        "time_casa": "Bahia", "time_visitante": "Vitória",
        "placar": "3 x 0", "status": "Disponível", "duracao_min": 107,
        "avaliacao": Decimal("4.3"),
        "descricao": "Ba-Vi clássico baiano na fase de grupos do Campeonato Baiano 2025.",
        "url_thumb": "https://placehold.co/300x170/141414/00e676?text=BAH+x+VIT"
    },
    {
        "jogoId": "J008", "titulo": "Sport x Náutico",
        "campeonato": "Campeonato Pernambucano", "data": "2025-05-10", "horario": "16:00",
        "time_casa": "Sport", "time_visitante": "Náutico",
        "placar": "2 x 1", "status": "Disponível", "duracao_min": 105,
        "avaliacao": Decimal("4.2"),
        "descricao": "Clássico pernambucano na final do Campeonato Pernambucano 2025.",
        "url_thumb": "https://placehold.co/300x170/141414/00e676?text=SPO+x+NAU"
    },
    {
        "jogoId": "J009", "titulo": "Fortaleza x Ceará",
        "campeonato": "Campeonato Cearense", "data": "2025-05-17", "horario": "18:30",
        "time_casa": "Fortaleza", "time_visitante": "Ceará",
        "placar": "1 x 2", "status": "Disponível", "duracao_min": 109,
        "avaliacao": Decimal("4.6"),
        "descricao": "Clássico cearense na final do Campeonato Cearense 2025.",
        "url_thumb": "https://placehold.co/300x170/141414/00e676?text=FOR+x+CEA"
    },
    {
        "jogoId": "J010", "titulo": "Athletico-PR x Coritiba",
        "campeonato": "Campeonato Paranaense", "data": "2025-05-24", "horario": "16:00",
        "time_casa": "Athletico-PR", "time_visitante": "Coritiba",
        "placar": "0 x 0", "status": "Disponível", "duracao_min": 120,
        "avaliacao": Decimal("4.5"),
        "descricao": "Atletiba clássico paranaense na final do Campeonato Paranaense 2025.",
        "url_thumb": "https://placehold.co/300x170/141414/00e676?text=CAP+x+COR"
    },
    {
        "jogoId": "J011", "titulo": "Brasil x Argentina",
        "campeonato": "Eliminatórias Copa 2026", "data": "2025-06-05", "horario": "21:45",
        "time_casa": "Brasil", "time_visitante": "Argentina",
        "placar": "—", "status": "Em Breve", "duracao_min": None,
        "avaliacao": None,
        "descricao": "Brasil x Argentina pelas Eliminatórias da Copa do Mundo 2026.",
        "url_thumb": "https://placehold.co/300x170/141414/ffd600?text=BRA+x+ARG"
    },
    {
        "jogoId": "J012", "titulo": "Flamengo x PSG",
        "campeonato": "Mundial de Clubes FIFA", "data": "2025-06-20", "horario": "15:00",
        "time_casa": "Flamengo", "time_visitante": "PSG",
        "placar": "—", "status": "Em Breve", "duracao_min": None,
        "avaliacao": None,
        "descricao": "Flamengo enfrenta o PSG no Mundial de Clubes FIFA 2025.",
        "url_thumb": "https://placehold.co/300x170/141414/ffd600?text=FLA+x+PSG"
    },
]

print("Inserindo jogos na tabela kickstream-jogos...")
for jogo in jogos:
    # Remove campos None para o DynamoDB
    item = {k: v for k, v in jogo.items() if v is not None}
    table.put_item(Item=item)
    print(f"  ✅ {item['jogoId']} — {item['titulo']}")

print("\nTodos os 12 jogos inseridos com sucesso!")
