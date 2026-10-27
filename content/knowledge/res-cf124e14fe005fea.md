## 解法




### 方法一



> **思考**
>
> 英文读法按千分位分组：Billion、Million、Thousand。每组至多三位数，可用二十以内、整十与 Hundred 拼出。
>
> $0$ 单独返回 Zero；从高到低取每组非零块，调用 $transfer$ 后再接单位。






#### Python3


```python
class Solution:
    def numberToWords(self, num: int) -> str:
        if num == 0:
            return 'Zero'

        lt20 = [
            '',
            'One',
            'Two',
            'Three',
            'Four',
            'Five',
            'Six',
            'Seven',
            'Eight',
            'Nine',
            'Ten',
            'Eleven',
            'Twelve',
            'Thirteen',
            'Fourteen',
            'Fifteen',
            'Sixteen',
            'Seventeen',
            'Eighteen',
            'Nineteen',
        ]
        tens = [
            '',
            'Ten',
            'Twenty',
            'Thirty',
            'Forty',
            'Fifty',
            'Sixty',
            'Seventy',
            'Eighty',
            'Ninety',
        ]
        thousands = ['Billion', 'Million', 'Thousand', '']

        def transfer(num):
            if num == 0:
                return ''
            if num < 20:
                return lt20[num] + ' '
            if num < 100:
                return tens[num // 10] + ' ' + transfer(num % 10)
            return lt20[num // 100] + ' Hundred ' + transfer(num % 100)

        res = []
        i, j = 1000000000, 0
        while i > 0:
            if num // i != 0:
                res.append(transfer(num // i))
                res.append(thousands[j])
                res.append(' ')
                num %= i
            j += 1
            i //= 1000
        return ''.join(res).strip()
```


#### TypeScript


```ts
function numberToWords(num: number): string {
    if (num === 0) {
        return 'Zero';
    }

    const lt20 = [
        '',
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
        'Ten',
        'Eleven',
        'Twelve',
        'Thirteen',
        'Fourteen',
        'Fifteen',
        'Sixteen',
        'Seventeen',
        'Eighteen',
        'Nineteen',
    ];

    const tens = [
        '',
        'Ten',
        'Twenty',
        'Thirty',
        'Forty',
        'Fifty',
        'Sixty',
        'Seventy',
        'Eighty',
        'Ninety',
    ];

    const thousands = ['Billion', 'Million', 'Thousand', ''];

    const transfer = (n: number): string => {
        if (n === 0) {
            return '';
        }
        if (n < 20) {
            return lt20[n];
        }
        if (n < 100) {
            if (n % 10 === 0) {
                return tens[Math.floor(n / 10)];
            }
            return tens[Math.floor(n / 10)] + ' ' + transfer(n % 10);
        }
        if (n % 100 === 0) {
            return lt20[Math.floor(n / 100)] + ' Hundred';
        }
        return lt20[Math.floor(n / 100)] + ' Hundred ' + transfer(n % 100);
    };

    let res = '';
    for (let i = 1_000_000_000, j = 0; i > 0; i = Math.floor(i / 1000), ++j) {
        const cur = Math.floor(num / i);
        if (cur === 0) {
            continue;
        }
        if (res !== '') {
            res += ' ';
        }
        res += transfer(cur);
        if (thousands[j] !== '') {
            res += ' ' + thousands[j];
        }
        num %= i;
    }
    return res;
}
```
