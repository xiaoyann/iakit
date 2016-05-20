# foundation
Alert, Toast, Loading, ActionSheet 常用组件封装，没有任何依赖，只适用于移动端。

## `Alert(title, content, buttons)`

* title: `string`，必选
* content: `string`，可选
* buttons: `array`，或者直接为一个`function`，可选

```js
import {Alert} from 'foundation';
```

```js
Alert('注册失败', '该邮箱已经被注册，如果有您有任何疑问请咨询客服。');
```

```js
Alert('注册失败', () => {
    // do something
});
```

```js
Alert(
    '注册失败', 
    '该邮箱已经被注册，如果有您有任何疑问请咨询客服。', 
    [
        { text: '取消', onClick: () => {} },
        { text: '确定', onClick: () => {} },
    ]
);
```


## `Toast(content, time, callback)`

* content: `string` 必选
* time: `number` 显示多少毫秒，可选，默认 1500
* callback: `function` 可选


```js
import {Toast} from 'foundation';
```

```js
Toast.showTop('注册成功');
```

```js
Toast.showCenter('注册成功', 3000);
```

```js
Toast.showBottom('注册成功', 3000, () => {
    // do something
});
```


## `Loading()`

```js
import {Loading} from 'foundation';
```

```js
Loading.show();

setTimeout(() => {
    Loading.hide();
}, 2000);
```

## `ActionSheet(options)`

#### options:
* title: `string`，可选
* options: `array`，必选
* destructiveIndex：`number` 可选

```js
import {ActionSheet} from 'foundation';
```

```js
ActionSheet({
    options: [
        {
            text: '我再想想',
            onClick: () => {
                // 是应该好好想想
            }
        },
        {
            text: '就这样吧',
            onClick: () => {
                // 借酒消愁去吧
            }
        }
    ],
    destructiveIndex: 1,
    title: '确认要分手吗？'
});
```
