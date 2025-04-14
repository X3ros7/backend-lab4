# Тестування OAuth 2.0 Keycloak

## Загальна інформація

Базовий URL Keycloak: `http://localhost:8080`

Realm: `prosvetov`

Client ID: `backend-examples-lab4`

## 1. Authorization Code Flow

### 1.1 Отримання коду авторизації

**Запит:**

```
GET /realms/prosvetov/protocol/openid-connect/auth
```

**Обов'язкові параметри:**

- `client_id=backend-examples-lab4`
- `response_type=code`
- `redirect_uri=http://localhost:5174/callback`
- `scope=openid`
- `state={випадкове_значення}`

**Приклад URL:**

```
http://localhost:8080/realms/prosvetov/protocol/openid-connect/auth?client_id=backend-examples-lab4&response_type=code&redirect_uri=http://localhost:5174/callback&scope=openid&state=12345
```

### 1.2 Обмін коду на токен

**Запит:**

```
POST /realms/prosvetov/protocol/openid-connect/token
Content-Type: application/x-www-form-urlencoded
```

**Обов'язкові параметри:**

- `grant_type=authorization_code`
- `client_id=backend-examples-lab4`
- `code={отриманий_код}`
- `redirect_uri=http://localhost:5174/callback`

## 2. Implicit Flow

**Запит:**

```
GET /realms/prosvetov/protocol/openid-connect/auth
```

**Обов'язкові параметри:**

- `client_id=backend-examples-lab4`
- `response_type=token id_token`
- `redirect_uri=http://localhost:5174/callback`
- `scope=openid`
- `nonce={випадкове_значення}`
- `state={випадкове_значення}`

**Приклад URL:**

```
http://localhost:8080/realms/prosvetov/protocol/openid-connect/auth?client_id=backend-examples-lab4&response_type=token id_token&redirect_uri=http://localhost:5174/callback&scope=openid&nonce=67890&state=12345
```

## 3. Resource Owner Password Credentials Flow

**Запит:**

```
POST /realms/prosvetov/protocol/openid-connect/token
Content-Type: application/x-www-form-urlencoded
```

**Обов'язкові параметри:**

- `grant_type=password`
- `client_id=backend-examples-lab4`
- `username={username}`
- `password={password}`
- `scope=openid`

## 4. Client Credentials Flow

**Запит:**

```
POST /realms/prosvetov/protocol/openid-connect/token
Content-Type: application/x-www-form-urlencoded
```

**Обов'язкові параметри:**

- `grant_type=client_credentials`
- `client_id=backend-examples-lab4`
- `client_secret={client_secret}` (потрібен для конфіденційних клієнтів)

## 5. Оновлення токену

**Запит:**

```
POST /realms/prosvetov/protocol/openid-connect/token
Content-Type: application/x-www-form-urlencoded
```

**Обов'язкові параметри:**

- `grant_type=refresh_token`
- `client_id=backend-examples-lab4`
- `refresh_token={refresh_token}`

## 6. Отримання інформації про користувача

**Запит:**

```
GET /realms/prosvetov/protocol/openid-connect/userinfo
Authorization: Bearer {access_token}
```

## 7. Вихід з системи

**Запит:**

```
POST /realms/prosvetov/protocol/openid-connect/logout
Content-Type: application/x-www-form-urlencoded
```

**Обов'язкові параметри:**

- `client_id=backend-examples-lab4`
- `refresh_token={refresh_token}`

## Відповіді сервера

### Успішна відповідь на запит токену:

```json
{
  "access_token": "eyJhbGci...",
  "expires_in": 300,
  "refresh_expires_in": 1800,
  "refresh_token": "eyJhbGci...",
  "token_type": "Bearer",
  "id_token": "eyJhbGci...",
  "not-before-policy": 0,
  "session_state": "..."
}
```

### Помилки автентифікації:

```json
{
  "error": "invalid_grant",
  "error_description": "Invalid user credentials"
}
```

```json
{
  "error": "unauthorized_client",
  "error_description": "Invalid client or Invalid client credentials"
}
```
