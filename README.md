# README

以下、plantUMLです。

```plantuml
class Account {
  - id: string;
  - name: string;
  # age: number;
  + history: string;
}

class Recruit {
  - id: string
  - post: string
  - job: string
  - creatorAccountID: string
  - isFinished: boolean
}

class Apply {
  - id: string
  - recruiterAccountID: string
  - applicantAccountID: string
  - recruitID: string
}
```

- Account
  - 学生
  - 電力使用量を発行するシステム担当
  - 経理担当
- 配電
  - 電力会社
  - 太陽光
- 取引額
- 残高
- 学生の支払手段
- 購入・売却
- トークン発行
- 月初の使用量計算
- 月末の精算

```plantuml
class StudentAccount {
  - id: string
  - name: string
  - payment_method: string
  - xrp_address: string
}

class AdminAccount {
  - id: string
  - name: string
  - xrp_address: string
}

class AccountantAccount {
  - id: string
  - name: string
  - xrp_address: string
}

class MonthlyUsage {
  - id: string
  - student_account_id: string
  - amount_kwh: number //150
}

class MonthlyClearance {
  - id: string
  - student_account_id: string
  - is_finished: bloolean
}

class Transaction {
  - id: string;
  - sender_account_id: string
  - sender_xrp_address: string
  - recipient_account_id: string
  - recipient_xrp_address: string
  - amount: number // 100
  - denom: string // 'JPY'
}

class Balance {
  - id: string
  - account_id: string
  - jpy_amount: number
  - xrp_amount: number
}

class PowerFromDistLine {
  - id: string;
  - student_account_id: string;
  - amount_kwh: number;
  - price: number;
  - denom: string;
}

class PowerFromSolarPV {
  - id: string;
  - student_account_id: string;
  - amount_kwh: number;
  - price: number;
  - denom: string;
}
```
