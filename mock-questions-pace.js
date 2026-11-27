/* ============================================================
   ペース練習専用問題 QUESTIONS_PACE（30問）
   Java SE 17 Programmer I（1Z0-825-JPN）公式32細目に準拠したオリジナル問題。
   第1〜第3セットとは別のプールで、ペースモードでのみ出題される。
   コード問題は JDK 17.0.21 で実際にコンパイル・実行して正解を検証済み。
   ============================================================ */
const QUESTIONS_PACE = [
{cat:"1-1 mainメソッドとプログラムの作成", tag:"1-1", text:"次のクラスをコンパイルし、java Main で実行するとどうなるか。", code:
`public class Main {
    public static void Main(String[] args) {
        System.out.println("Hello");
    }
}`,
choices:["Hello と出力される","コンパイルエラーになる","実行時にエラーになる","何も出力されずに終了する"], answers:[2],
expl:`正解: 実行時にエラーになる

エントリーポイントのメソッド名は小文字の main でなければならない。大文字の Main は通常のメソッドとして扱われるためコンパイルは通るが、起動できる main が見つからず実行時にエラーになる。

・A: 大文字の Main はエントリーポイントとして認識されない
・B: 宣言自体は合法なメソッドなのでコンパイルは通る`},

{cat:"1-2 コンパイルと実行・コマンドライン引数", tag:"1-2", text:"次のコードをコンパイルし、java Main red blue と実行するとどうなるか。", code:
`public class Main {
    public static void main(String[] args) {
        System.out.println(args[2]);
    }
}`,
choices:["blue と出力される","red と出力される","コンパイルエラーになる","実行時に ArrayIndexOutOfBoundsException が発生する"], answers:[3],
expl:`正解: 実行時に ArrayIndexOutOfBoundsException が発生する

引数は red と blue の2つだけなので、args の要素は args[0] と args[1] のみ。args[2] は範囲外アクセスになり、実行時例外が発生する。コンパイルでは検出できない。

・A/B: 存在しない3番目の引数は出力できない`},

{cat:"1-3 パッケージとimport", tag:"1-3", text:"次のコードをコンパイル・実行するとどうなるか。", code:
`public class Main {
    public static void main(String[] args) {
        java.util.ArrayList<String> list = new java.util.ArrayList<>();
        list.add("x");
        System.out.println(list.size());
    }
}`,
choices:["1 と出力される","0 と出力される","コンパイルエラーになる","実行時に例外が発生する"], answers:[0],
expl:`正解: 1 と出力される

完全修飾名（パッケージ名つきのクラス名）を使えば import 文は不要で、そのままコンパイル・実行できる。要素を1つ追加したので size は 1。

・C: import がないことはエラーにならない（完全修飾名で参照しているため）`},

{cat:"2-1 変数の宣言・初期化とスコープ", tag:"2-1", text:"次のコードをコンパイルするとどうなるか。", code:
`public class Main {
    public static void main(String[] args) {
        int total = 10;
        {
            int total = 20;
            System.out.println(total);
        }
        System.out.println(total);
    }
}`,
choices:["20 と 10 が出力される","コンパイルエラーになる","10 と 10 が出力される","実行時に例外が発生する"], answers:[1],
expl:`正解: コンパイルエラーになる

ローカル変数は、内側のブロックでも外側と同じ名前を再宣言できない。フィールドが同名のローカル変数に隠される（シャドウイング）ケースとは異なり、ローカル変数同士の同名宣言は重複としてエラーになる。`},

{cat:"2-1 変数の宣言・初期化とスコープ", tag:"2-1", text:"次のコードをコンパイルするとどうなるか。", code:
`public class Main {
    public static void main(String[] args) {
        byte a = 3;
        byte b = 4;
        byte c = a + b;
        System.out.println(c);
    }
}`,
choices:["7 と出力される","コンパイルエラーになる","実行時に例外が発生する","3 と出力される"], answers:[1],
expl:`正解: コンパイルエラーになる

byte 同士の演算結果は int に型昇格する。int から byte への代入には明示的なキャストが必要で、この場合は変数同士の演算なので定数式としての特例も効かない。なお c = (byte)(a + b) や複合代入 c += a ではエラーにならない。`},

{cat:"2-1 変数の宣言・初期化とスコープ", tag:"2-1", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    public static void main(String[] args) {
        double d = -9.99;
        int i = (int) d;
        System.out.println(i);
    }
}`,
choices:["-10","-9","9","コンパイルエラーになる"], answers:[1],
expl:`正解: -9

浮動小数点数から整数へのキャストは「0方向への切り捨て」。-9.99 の小数部分が切り捨てられて -9 になる。四捨五入や -10 への切り下げではない点が引っかけ。`},

{cat:"2-1 変数の宣言・初期化とスコープ", tag:"2-1", text:"次のコードをコンパイル・実行するとどうなるか。", code:
`public class Main {
    public static void main(String[] args) {
        Integer n = null;
        int m = n;
        System.out.println(m);
    }
}`,
choices:["0 と出力される","コンパイルエラーになる","実行時に NullPointerException が発生する","null と出力される"], answers:[2],
expl:`正解: 実行時に NullPointerException が発生する

int m = n; ではラッパー型からプリミティブ型へのアンボクシングが自動で行われる。n が null の場合、値を取り出せず実行時に NullPointerException が発生する。コンパイル自体は通る。

・A: null が 0 に置き換わるわけではない`},

{cat:"2-2 ローカル変数型推論（var）", tag:"2-2", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    public static void main(String[] args) {
        var arr = new int[] {10, 20, 30};
        System.out.println(arr.length + arr[1]);
    }
}`,
choices:["23","5","コンパイルエラーになる","50"], answers:[0],
expl:`正解: 23

var でも new int[] {...} の形で書けば int[] 型と推論できるためコンパイルできる。arr.length は 3、arr[1] は 20 で、合計 23。

・C: エラーになるのは初期化子だけを書く var arr = {10, 20, 30}; の形`},

{cat:"2-3 文字列の作成と操作", tag:"2-3", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    public static void main(String[] args) {
        String s = "Silver";
        System.out.println(s.indexOf("v") + ":" + s.substring(0, 3));
    }
}`,
choices:["3:Sil","2:Sil","3:Silv","-1:Sil"], answers:[0],
expl:`正解: 3:Sil

indexOf は先頭を 0 として数えるため、"Silver" の v は 3。substring(0, 3) は開始位置 0 を含み終了位置 3 を含まないので "Sil"。

・B: v の位置を 1 から数えた誤り
・C: substring の終了位置は含まれない`},

{cat:"2-3 文字列の作成と操作", tag:"2-3", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    public static void main(String[] args) {
        StringBuilder a = new StringBuilder("ab");
        StringBuilder b = new StringBuilder("ab");
        System.out.println(a.equals(b) + " " + a.toString().equals(b.toString()));
    }
}`,
choices:["true true","false true","false false","true false"], answers:[1],
expl:`正解: false true

StringBuilder は equals をオーバーライドしていないため、a.equals(b) は Object の参照比較になり false。中身を比べたい場合は toString() で String にしてから equals を使う（こちらは true）。`},

{cat:"2-4 配列の使用", tag:"2-4", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    public static void main(String[] args) {
        int a[] = {1, 2}, b = 5;
        System.out.println(a.length + b);
    }
}`,
choices:["7","コンパイルエラーになる","3","25"], answers:[0],
expl:`正解: 7

int a[], b = 5; の形では、配列になるのは a だけで、b は int 型の変数になる（int[] a, b; と書けば両方配列）。a.length は 2、b は 5 で、合計 7。`},

{cat:"2-5 ArrayListの使用", tag:"2-5", text:"次のコードの実行結果はどれか。", code:
`import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(List.of(5, 10, 15));
        list.remove(Integer.valueOf(10));
        System.out.println(list);
    }
}`,
choices:["[5, 15]","[5, 10]","[10, 15]","コンパイルエラーになる"], answers:[0],
expl:`正解: [5, 15]

Integer.valueOf(10) を渡すと remove(Object) が選ばれ、「要素の値 10」が削除される。もし remove(10) と書くと remove(int) のインデックス指定になり、このリストでは範囲外で例外になる。`},

{cat:"3-1 分岐文（if・switch文）", tag:"3-1", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    public static void main(String[] args) {
        String k = "b";
        switch (k) {
            case "a": System.out.print("A");
            case "b": System.out.print("B");
            case "c": System.out.print("C"); break;
            default: System.out.print("D");
        }
    }
}`,
choices:["B","BC","BCD","コンパイルエラーになる"], answers:[1],
expl:`正解: BC

switch 文は String でも使える。case "b" に一致した後、break がないため case "c" に落ちて（fall-through）C まで出力され、そこで break して抜ける。default には到達しない。`},

{cat:"3-2 繰り返し文", tag:"3-2", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    public static void main(String[] args) {
        int n = 1;
        while (n < 100) {
            n *= 2;
        }
        System.out.println(n);
    }
}`,
choices:["100","128","64","コンパイルエラーになる"], answers:[1],
expl:`正解: 128

n は 1→2→4→8→16→32→64→128 と倍増する。64 の時点で条件 n < 100 が真なのでもう1回実行され 128 になり、そこで条件が偽になって終了する。ちょうど 100 にはならない。`},

{cat:"3-3 break・continueとラベル", tag:"3-3", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (i == j) break;
                System.out.print(i + "" + j + " ");
            }
        }
    }
}`,
choices:["10 20 21","00 10 20 21","10 21","何も出力されない"], answers:[0],
expl:`正解: 10 20 21

ラベルなしの break は最も内側のループだけを抜ける。i=0 のときは j=0 で即 break して何も出ない。i=1 では 10 の後に j=1 で break、i=2 では 20、21 の後に j=2 で break する。外側のループは最後まで回る。`},

{cat:"3-4 switch式", tag:"3-4", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    public static void main(String[] args) {
        int n = 4;
        int r = switch (n) {
            case 1 -> 10;
            case 2 -> 20;
            default -> {
                int t = n * 10;
                yield t + 1;
            }
        };
        System.out.println(r);
    }
}`,
choices:["40","41","10","コンパイルエラーになる"], answers:[1],
expl:`正解: 41

n は 4 でどの case にも一致しないため default に入る。ブロック内では t = 40 を計算し、yield で t + 1 = 41 を switch 式の値として返す。`},

{cat:"3-5 演算子", tag:"3-5", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    public static void main(String[] args) {
        int a = 0;
        int b = 0;
        boolean r = (a++ > 0) || (b++ > 0);
        System.out.println(a + " " + b + " " + r);
    }
}`,
choices:["1 1 false","0 1 false","1 0 false","0 0 false"], answers:[0],
expl:`正解: 1 1 false

後置の ++ は「使ってから増える」ため、両方の比較は 0 > 0 で false。|| は左辺が false なので右辺も評価され、b++ も実行される。結果として a と b は両方 1 になり、r は false。`},

{cat:"3-5 演算子", tag:"3-5", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    public static void main(String[] args) {
        int x = 5;
        boolean r = (x > 10) & (x++ > 0);
        System.out.println(x + " " + r);
    }
}`,
choices:["5 false","6 false","6 true","5 true"], answers:[1],
expl:`正解: 6 false

& は短絡評価をしないため、左辺 (x > 10) が false でも右辺が評価され、x++ が実行されて x は 6 になる。r は false & true で false。もし && なら右辺は評価されず x は 5 のままになる。`},

{cat:"4-1 クラスの定義と初期化の順序", tag:"4-1", text:"次のコードの実行結果はどれか。", code:
`class Sample {
    String s = "field";
    {
        s += "-block";
    }
    Sample() {
        s += "-ctor";
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new Sample().s);
    }
}`,
choices:["field-block-ctor","field-ctor-block","ctor-block-field","コンパイルエラーになる"], answers:[0],
expl:`正解: field-block-ctor

インスタンス生成時の順序は、フィールド初期化と初期化ブロックが「書かれた順」に実行され、その後にコンストラクタ本体が実行される。この場合は フィールド初期化 → 初期化ブロック → コンストラクタ の順。`},

{cat:"4-2 メソッドとコンストラクタ", tag:"4-2", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    static void reset(StringBuilder sb) {
        sb = new StringBuilder("new");
    }

    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("old");
        reset(sb);
        System.out.println(sb);
    }
}`,
choices:["old","new","コンパイルエラーになる","実行時に例外が発生する"], answers:[0],
expl:`正解: old

Java の引数は値渡しのみ。オブジェクトの参照は渡せるが、メソッドの中で引数の参照を別のオブジェクトに付け替えても、呼び出し側の変数には影響しない。なお、参照先の中身を変更（append など）した場合は呼び出し側にも影響する。`},

{cat:"4-3 メソッドのオーバーロード", tag:"4-3", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    static void m(int n) {
        System.out.println("int");
    }
    static void m(long n) {
        System.out.println("long");
    }

    public static void main(String[] args) {
        m('a');
    }
}`,
choices:["int","long","コンパイルエラーになる","a と出力される"], answers:[0],
expl:`正解: int

char 型の値は int にも long にも拡大変換できるが、オーバーロードの解決では変換の幅が小さい int 版が優先される。ボクシング（Character）よりも拡大変換が先に検討される段階であることもポイント。`},

{cat:"4-6 instanceofのパターンマッチング", tag:"4-6", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    static void show(Object o) {
        if (!(o instanceof String s)) {
            System.out.println("not string");
            return;
        }
        System.out.println(s.toUpperCase());
    }

    public static void main(String[] args) {
        show("pace");
    }
}`,
choices:["PACE","pace","not string","コンパイルエラーになる"], answers:[0],
expl:`正解: PACE

instanceof を否定して return で抜ける形にすると、その後のコードでは「String であったこと」が確定しているため、パターン変数 s を使える（フロー・スコープ）。"pace" は String なので大文字化されて PACE と出力される。`},

{cat:"5-4 キャストとポリモーフィズム", tag:"5-4", text:"次のコードの実行結果はどれか。", code:
`class Vehicle {
}

class Bike extends Vehicle {
    String bell() {
        return "ring";
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle v = new Bike();
        if (v instanceof Bike b) {
            System.out.println(b.bell());
        } else {
            System.out.println("no");
        }
    }
}`,
choices:["ring","no","コンパイルエラーになる","実行時に ClassCastException が発生する"], answers:[0],
expl:`正解: ring

実体は Bike なので instanceof が true になり、パターン変数 b（Bike 型）を通して Bike 固有のメソッド bell() を呼べる。明示的なキャストを書かずに安全にダウンキャストできるのがパターン・マッチングの利点。`},

{cat:"5-7 デフォルトメソッドとprivateメソッド", tag:"5-7", text:"次のコードの実行結果はどれか。", code:
`interface Play {
    default String sound() {
        return "interface";
    }
}

class Base {
    public String sound() {
        return "class";
    }
}

class Sub extends Base implements Play {
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new Sub().sound());
    }
}`,
choices:["class","interface","コンパイルエラーになる","実行時に例外が発生する"], answers:[0],
expl:`正解: class

優先順位は「クラス側のメソッド（継承したものを含む）＞ インタフェースの default メソッド」。Sub は Base の sound() を継承しているため、Play の default と衝突せず、クラス側の "class" が呼ばれる。`},

{cat:"6-1 例外の仕組みと例外クラス階層", tag:"6-1", text:"チェック例外（checked exception）であるものをすべて選べ。", code:null,
choices:["IOException","NullPointerException","ClassNotFoundException","ArithmeticException"], answers:[0,2], multi:true,
expl:`正解: IOException と ClassNotFoundException

この2つは Exception のサブクラスで RuntimeException ではないため、catch か throws の処理が必須のチェック例外。NullPointerException と ArithmeticException は RuntimeException のサブクラスで非チェック例外。`},

{cat:"6-1 例外の仕組みと例外クラス階層", tag:"6-1", text:"次のコードをコンパイル・実行するとどうなるか。", code:
`public class Main {
    public static void main(String[] args) {
        try {
            throw new StackOverflowError();
        } catch (Exception e) {
            System.out.println("caught");
        }
        System.out.println("end");
    }
}`,
choices:["caught と end が出力される","end だけ出力される","コンパイルエラーになる","StackOverflowError が捕捉されずにプログラムが終了する"], answers:[3],
expl:`正解: StackOverflowError が捕捉されずにプログラムが終了する

StackOverflowError は Error のサブクラスであり、Exception のサブクラスではない。そのため catch (Exception e) では捕捉できず、そのまま JVM に渡ってプログラムが終了する。"caught" も "end" も出力されない。`},

{cat:"6-2 try-catch文による例外処理", tag:"6-2", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    static void a() {
        try {
            b();
            System.out.print("A");
        } catch (RuntimeException e) {
            System.out.print("C");
        }
    }

    static void b() {
        throw new IllegalStateException();
    }

    public static void main(String[] args) {
        a();
        System.out.print("M");
    }
}`,
choices:["CM","ACM","AM","コンパイルエラーになる"], answers:[0],
expl:`正解: CM

b() で例外が発生すると、a() の try の残りの処理（"A" の出力）は実行されず、例外は a() の catch に捕捉されて "C" が出力される。その後は main の続き "M" が通常どおり実行される。`},

{cat:"6-2 try-catch文による例外処理", tag:"6-2", text:"次のコードの実行結果はどれか。", code:
`public class Main {
    public static void main(String[] args) {
        try {
            int r = 10 / 0;
            System.out.println(r);
        } catch (ArithmeticException e) {
            System.out.print("arith");
        } catch (RuntimeException e) {
            System.out.print("runtime");
        } finally {
            System.out.print(" fin");
        }
    }
}`,
choices:["arith fin","runtime fin","fin","コンパイルエラーになる"], answers:[0],
expl:`正解: arith fin

整数のゼロ除算では ArithmeticException が発生する。catch は上から順に判定され、子クラス（ArithmeticException）側が先に書かれているため正しく捕捉される。その後 finally が実行されて " fin" が続く。親クラス側を先に書くと到達不能でコンパイルエラーになる。`},

{cat:"6-3 try-with-resources文", tag:"6-3", text:"次のコードの実行結果はどれか。", code:
`class Door implements AutoCloseable {
    public void close() {
        System.out.print("closed");
    }
}

public class Main {
    public static void main(String[] args) {
        Door d = new Door();
        try (d) {
            System.out.print("in ");
        }
    }
}`,
choices:["in closed","closed in","コンパイルエラーになる","in だけ出力される"], answers:[0],
expl:`正解: in closed

Java 9 からは、既に宣言済みの変数をそのまま try-with-resources のリソースとして指定できる（その変数が実質的に final であることが条件）。本体の "in " が出力された後、close() が自動で呼ばれて "closed" が続く。`},

{cat:"6-5 multi-catch句", tag:"6-5", text:"次のコードをコンパイル・実行するとどうなるか。", code:
`public class Main {
    public static void main(String[] args) {
        try {
            String s = null;
            System.out.println(s.length());
        } catch (NullPointerException | ArithmeticException e) {
            System.out.println("caught");
        }
    }
}`,
choices:["caught と出力される","コンパイルエラーになる","実行時に NullPointerException が発生する","何も出力されない"], answers:[0],
expl:`正解: caught と出力される

multi-catch で並べられるのは、継承関係のない例外型同士。NullPointerException と ArithmeticException は別系統（どちらも RuntimeException の子だが互いに親子ではない）なので、この書き方は正しく、NullPointerException が捕捉される。親と子を並べるとコンパイルエラーになる。`},
];
