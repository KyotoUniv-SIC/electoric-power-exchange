# README

```plantuml
class Account {
  - id: string;
  - name: string;
  # age: number;
  + history: string;
}

```

```plantuml

class Recruit {
  - id: string
  - post: string
  - job: string
  - creatorAccountID: string
  - isFinished: boolean
}

```

```plantuml

class Apply {
  - id: string
  - recruiterAccountID: string
  - applicantAccountID: string
  - recruitID: string
}
```

- Account
- 取引額
- 残高
- 学生の払い方
- 購入と売却
- 学生のアカウント
- 電力使用権を発行するシステム担当のアカウント
- 経理担当アカウント
- 電力会社からの配電と、太陽光発電からの配電
- トークン
- 経理のほうで月初の使用料計算
- 月の終わりの清算

```plantuml
class StudentAccount {
  - id: string;
  - name: string;
  - payment_method: string;
  - xrp_address;
}
```

```plantuml
class AdminAccount {
  - id: string;
  - name: string;
}
```

```plantuml
class AccountantAccount {
  - id: string;
  - name: string;
}
```

```plantuml
class MonthlyUsage {
  - id: string;
  - student_account_id: string;
  - 
  - amount_kwh: number;
  - 
}
```

```plantuml
class MonthlyClearance {
  - id: string;
  - student_account_id: string;
}
```

```plantuml
class Transaction {
  - id;
  - sender_account_id: string;
  - sender_xrp_address: string;
  - recipient_account_id: string;
  - recipient_xrp_address: string;
  - amount: number; // 100
  - denom: string; // 'JPY'
}
```

```plantuml
class Balance {
  - id: string;
  - account_id: string;
  - jpy_amount: number;
  - xrp_amount: number;
}

```

```plantuml
class PowerFromDistLine {
  - id: string;
  - student_account_id: string;
  - amount_kwh: number;
  - price: number;
  - denom: string;
}
```

```plantuml
class PowerFromSolarPV {
  - id: string;
  - student_account_id: string;
  - amount_kwh: number;
  - price: number;
  - denom: string;
}
```
