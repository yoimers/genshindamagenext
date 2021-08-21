---
title: '計算式'
date: '2020-01-01'
---
若干一般的でない計算が入っているので掲載  
<br>
<br>

## **攻撃力・防御力・HP**  
***
<br>
<img src="/images/B合計攻撃力.svg" height="80%" width="80%">
<img src="/images/B合計防御力.svg" height="80%" width="80%">
<img src="/images/B合計HP.svg" height="60%" width="60%">
<br>
<img src="/images/B総合攻撃力.svg" height="60%" width="60%">  
<br>


<font color="Wheat">
ノエル・アルベドや鍾離のような防御力やHPをダメージ計算に入るキャラを考慮しています。  
攻撃力比率・防御力比率・HP比率は <font color="GoldenRod">A-B-HP比率%</font> で設定出来ます。
</font>
<br>
<br>

## **会心率・会心ダメ**  
***
<br>
<img src="/images/B会心倍率.svg" height="100%" width="100%">
<br>

<font color="Wheat">
会心率が100%以上なら100%に落としています<br>
期待値-最大値比の意味は通常の意味での期待値と会心時のダメージを混ぜ合わせた比率r<br>
「(1-r)*期待値 + r*会心時」展開すると上の式になる。
<br>
デフォルトではr=0 (率ダメ1:2がベストになる指標)<br>
r=0.2ぐらいにすると会心率70%-会心ダメ200%程度のバランスが最適になる  
</font>
<br>
<br>

## **元素反応**  
***
<br>
<img src="/images/B反応倍率期待値.svg" height="70%" width="70%">
<br>
<br>

<font color="Wheat">
反応倍率=１の時は強制的に熟知倍率１にして元素反応無効化<br>
反応率・・・元素反応の頻度　　
熟知と他ステの比較用に導入してます
</font>
<br>
<br>

## **元素ダメ**  
***
<br>
<img src="/images/B元素ダメ.svg" height="40%" width="40%">
<br>
<br>

## **総合ダメージ**  
***
<br>
<img src="/images/B総合ダメージ.svg" height="90%" width="90%">  
<br>

<font color="Wheat">
これを与えられた装備スコアの下で最大化
</font>