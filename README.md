# node-px2dt-health-check
Pickles 2 プロジェクトの状態を調べ、問題解決のためのヒントを提示します。


## 使い方 - Usage

```js
var Px2dtHealthChecker = require('../libs/main.js'),
    px2dtHealthChecker = new Px2dtHealthChecker(
        '/path/to/px2dt_data_dir/', // data directory
        0 // project index number, or project ID (Optional)
    );
px2dtHealthChecker.check(function(result){
	console.log(result);
});
```


## 更新履歴 - Change log

### px2dt-health-check 0.1.0 (2017年??月??日)

- Initial Release.


## ライセンス - License

MIT License


## 作者 - Author

- Tomoya Koyanagi <tomk79@gmail.com>
- website: <http://www.pxt.jp/>
- Twitter: @tomk79 <http://twitter.com/tomk79/>
