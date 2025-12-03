# 🍽️ Waiter.app — Aplikacja do zarządzania stolikami w restauracji

Aplikacja umożliwia kelnerom szybkie zarządzanie stanem stolików: zmiana statusu, liczby gości, maksymalnej pojemności oraz rachunku. Dane są zapisywane w czasie rzeczywistym na lokalnym serwerze API.

---

## 📌 Funkcjonalności

- 🔍 Przeglądanie listy stolików
- ✏️ Edycja szczegółów stolika:
  - Status: **Free**, **Reserved**, **Busy**, **Cleaning**
  - Liczba zajętych miejsc (`peopleAmount`)
  - Maksymalna liczba miejsc (`maxPeopleAmount`, nieedytowalna)
  - Kwota rachunku (tylko przy statusie **Busy**)
- 🧠 Inteligentna walidacja:
  - `peopleAmount` nie może przekroczyć `maxPeopleAmount`
  - Przy statusie **Free** lub **Cleaning** pola `peopleAmount` i `bill` są automatycznie zerowane
- 💾 Dane zapisywane na serwerze i zsynchronizowane z Reduxem
- ⏳ Widoczny stan ładowania i obsługa błędów
- 🔒 ID stolika jest nieedytowalne

---

## 🛠️ Technologie

- **React 18** + **Hooks**
- **Redux Toolkit** z **Redux Thunk**
- **React Bootstrap** (UI)
- **json-server** (lokalne API)
- **Yarn** (menedżer pakietów)

---

## 🚀 Jak uruchomić lokalnie?

### 1. Uruchom serwer API (json-server)

> ✅ Upewnij się, że masz plik `db.json` z danymi (zobacz niżej).

```bash
# Zainstaluj json-server (globalnie, raz)
npm install -g json-server

# W głównym folderze projektu uruchom serwer
json-server --watch db.json --port 3131
