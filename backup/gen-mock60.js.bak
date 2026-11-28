// 模試60問マスターデータ + 検証ハーネス
// 実行: node gen-mock60.js verify  -> 全問を javac/java で検証
//       node gen-mock60.js emit    -> mock-questions-60.js を出力
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const JDK = process.env.JAVA_HOME || (process.env.HOME + "/workspace/jdk17/jdk-17.0.21.1+2");
const JAVAC = JDK + "/bin/javac";
const JAVA = JDK + "/bin/java";

const Q = [];
function add(o) { o.n = Q.length + 1; Q.push(o); }

// ================= 主題1 =================
// Q1 [1-1]
add({ tag: "1-1", cat: "1-1 mainメソッドとプログラムの作成",
text: "次のコードをコンパイル・実行するとどうなるか。",
code:
`public class App {
    static public void main(String... args) {
        System.out.println("start");
    }
}`,
choices: ["start と出力される", "コンパイルエラーになる", "実行時にエラーになる（mainメソッドとして認識されない）", "何も出力されない"],
answers: [0],
expl:
`正解: start と出力される

mainメソッドの宣言は、アクセス修飾子と static の順序が入れ替わっても問題ない。また引数は String[] でも String...（可変長引数）でもよい。

・B: public と static の順序は自由。両方そろっていることが大事
・C: String... args は String[] args と同じ意味で、mainとして正しく認識される`,
verify: { file: "App.java", run: ["App"], stdout: "start" } });

// Q2 [1-1]
add({ tag: "1-1", cat: "1-1 mainメソッドとプログラムの作成",
text: "次のコードを Main.java というファイル名で保存し、javac Main.java でコンパイルするとどうなるか。",
code:
`public class App {
    public static void main(String[] args) {
        System.out.println("run");
    }
}`,
choices: ["コンパイルエラーになる", "run と出力される", "コンパイルはできるが、実行時にエラーになる", "警告は出るがコンパイルできる"],
answers: [0],
expl:
`正解: コンパイルエラーになる

publicクラスは1ファイルに1つだけで、ファイル名はそのクラス名と一致させなければならない。クラス名が App なのにファイル名が Main.java なのでコンパイルエラーになる。

・なお、java Main.java のソースファイルモードで実行する場合はこの制限を受けず、そのまま実行できる。コンパイル方法によって結果が変わる点が引っかけ`,
verify: { file: "Main.java", compileError: true } });

// Q3 [1-2]
add({ tag: "1-2", cat: "1-2 コンパイルと実行・コマンドライン引数",
text: "次のコードをコンパイルし、java Main 3 4 と実行した結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        System.out.println(args[0] + args[1]);
    }
}`,
choices: ["34", "7", "コンパイルエラーになる", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: 34

コマンドライン引数は文字列として args[0] から順に入る。args[0] は "3"、args[1] は "4" で、どちらも String なので + は文字列連結になり "34" になる。

・B: 数値として足し算されるわけではない。引数は常に String として渡される`,
verify: { file: "Main.java", run: ["Main", "3", "4"], stdout: "34" } });

// Q4 [1-2]
add({ tag: "1-2", cat: "1-2 コンパイルと実行・コマンドライン引数",
text: "次のコードを Main.java として保存し、java Main.java と実行した結果はどれか。",
code:
`class First {
    public static void main(String[] args) {
        System.out.println("first");
    }
}

class Second {
    public static void main(String[] args) {
        System.out.println("second");
    }
}`,
choices: ["first", "second", "コンパイルエラーになる", "実行時にエラーになる"],
answers: [0],
expl:
`正解: first

java にソースファイル名（拡張子付き）を渡すと、その場でコンパイルして実行するソースファイルモードになる（Java 11から）。この場合に実行されるのは、ファイル内で最初に宣言されたクラスの main メソッド。

・ファイル名とクラス名が一致しなくても実行できる点も、通常のコンパイルとの違い`,
verify: { file: "Main.java", sourceMode: true, stdout: "first" } });

// Q5 [1-3]
add({ tag: "1-3", cat: "1-3 パッケージとimport",
text: "次のコードをコンパイルするとどうなるか。",
code:
`import java.util.*;
import java.sql.*;

public class Main {
    public static void main(String[] args) {
        Date d = null;
        System.out.println(d);
    }
}`,
choices: ["コンパイルエラーになる", "null と出力される", "実行時に例外が発生する", "現在の日時が出力される"],
answers: [0],
expl:
`正解: コンパイルエラーになる

java.util.Date と java.sql.Date の両方がワイルドカードで import されているため、Date という名前がどちらのクラスを指すか曖昧になり、コンパイルエラーになる。

・ワイルドカード import は「使うときに解決される」ため、import の行自体ではなく Date を使った行でエラーになる
・どちらか一方を完全修飾名で書くか、単一型 import を併用すると解決できる`,
verify: { file: "Main.java", compileError: true } });

// Q6 [1-3]
add({ tag: "1-3", cat: "1-3 パッケージとimport",
text: "次のコードをコンパイルするとどうなるか。",
code:
`import java.util.ArrayList;

package mypack;

public class Main {
    public static void main(String[] args) {
        System.out.println("ok");
    }
}`,
choices: ["コンパイルエラーになる", "ok と出力される", "実行時に例外が発生する", "警告は出るがコンパイルできる"],
answers: [0],
expl:
`正解: コンパイルエラーになる

package 宣言は、コメントを除いてファイルの先頭に1つだけ書かなければならない。import 文の後ろに置くとコンパイルエラーになる。

・正しい並びは package 宣言 → import 文 → クラス宣言の順`,
verify: { file: "Main.java", compileError: true } });

// ================= 主題2 =================
// Q7 [2-1]
add({ tag: "2-1", cat: "2-1 変数の宣言・初期化とスコープ",
text: "次のコードをコンパイルするとどうなるか。",
code:
`public class Main {
    public static void main(String[] args) {
        int x;
        int y = 5;
        if (y > 3) {
            x = 10;
        }
        System.out.println(x);
    }
}`,
choices: ["コンパイルエラーになる", "10 と出力される", "0 と出力される", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: コンパイルエラーになる

ローカル変数は自動で初期化されない。x は if の中でのみ代入されており、条件が成立しない場合に値が決まらないため、コンパイラは「初期化されていない可能性がある」と判断してエラーにする。実際に y > 3 が真になると分かっていても、コンパイラはそこまで推論しない。

・フィールドとの違いが引っかけ。フィールドなら int は 0 で初期化される`,
verify: { file: "Main.java", compileError: true } });

// Q8 [2-1]
add({ tag: "2-1", cat: "2-1 変数の宣言・初期化とスコープ",
text: "次のコードをコンパイルするとどうなるか。",
code:
`public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            System.out.print(i);
        }
        System.out.println(i);
    }
}`,
choices: ["コンパイルエラーになる", "012 と出力される", "0123 と出力される", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: コンパイルエラーになる

for 文の初期化部で宣言した変数 i のスコープは、その for 文の中だけ。ループを抜けた後の println(i) では i は存在しないため、コンパイルエラーになる。

・変数のスコープは「宣言したブロックの終わりまで」が原則。ループ変数も例外ではない`,
verify: { file: "Main.java", compileError: true } });

// Q9 [2-1]
add({ tag: "2-1", cat: "2-1 変数の宣言・初期化とスコープ",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        byte b = 10;
        b += 5;
        System.out.println(b);
    }
}`,
choices: ["15", "コンパイルエラーになる", "5", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: 15

b = b + 5 と書くと、byte と int の演算結果は int になるため、byte への代入でコンパイルエラーになる。ところが複合代入演算子 b += 5 には暗黙のキャストが含まれているので、エラーにならず 15 になる。

・「byte同士の演算はintになる」という原則と、複合代入だけは例外という対比が引っかけ`,
verify: { file: "Main.java", run: ["Main"], stdout: "15" } });

// Q10 [2-1] 複数選択
add({ tag: "2-1", cat: "2-1 変数の宣言・初期化とスコープ",
text: "正しくコンパイルできる宣言をすべて選べ。",
code: null,
choices: ["int a = 0b1111;", "long b = 1234_5678L;", "int c = _777;", "float d = 3.14;", "int e = 010;"],
answers: [0, 1, 4],
expl:
`正解: int a = 0b1111; ／ long b = 1234_5678L; ／ int e = 010;

・0b は2進数リテラル（Java 7から）。アンダースコアは数字と数字の間に置くのは正しい
・int c = _777; は、_777 がリテラルではなく識別子として扱われるため、未定義の変数を参照することになりエラー
・float d = 3.14; は、小数リテラルがデフォルトで double なので、float へは明示的なキャストか f サフィックスが必要でエラー
・010 は先行ゼロで8進数として正しく解釈される`,
verify: { snippets: ["int a = 0b1111;", "long b = 1234_5678L;", "int c = _777;", "float d = 3.14;", "int e = 010;"], snippetOk: [true, true, false, false, true], snippetAnswer: "ok" } });

// Q11 [2-1]
add({ tag: "2-1", cat: "2-1 変数の宣言・初期化とスコープ",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        int i = 200;
        byte b = (byte) i;
        System.out.println(b);
    }
}`,
choices: ["-56", "200", "127", "コンパイルエラーになる"],
answers: [0],
expl:
`正解: -56

200 を byte（-128〜127）にキャストすると、上位ビットが切り捨てられて範囲内に収まる値へ変換され、-56 になる。エラーにはならず、黙って値が変わる。

・127（byteの最大値）に丸められるわけではない点が引っかけ。縮小変換は「切り捨て」であって「範囲内への丸め」ではない`,
verify: { file: "Main.java", run: ["Main"], stdout: "-56" } });

// Q12 [2-1]
add({ tag: "2-1", cat: "2-1 変数の宣言・初期化とスコープ",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    static int count;
    boolean flag;

    public static void main(String[] args) {
        Main m = new Main();
        System.out.println(count + " " + m.flag);
    }
}`,
choices: ["0 false", "null false", "コンパイルエラーになる", "0 true"],
answers: [0],
expl:
`正解: 0 false

フィールド（static変数もインスタンス変数も）は、初期化しなくてもデフォルト値が入る。数値型は 0、boolean は false、参照型は null。

・コンパイルエラーになるのは「ローカル変数を初期化せずに使う」場合だけ。フィールドとの違いを押さえる`,
verify: { file: "Main.java", run: ["Main"], stdout: "0 false" } });

module.exports = { Q, add };

// Q13 [2-2]
add({ tag: "2-2", cat: "2-2 ローカル変数型推論（var）",
text: "次のコードをコンパイルするとどうなるか。",
code:
`public class Main {
    public static void main(String[] args) {
        var n = 10;
        n = "ten";
        System.out.println(n);
    }
}`,
choices: ["コンパイルエラーになる", "ten と出力される", "10 と出力される", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: コンパイルエラーになる

var は「型がない」のではなく、右辺からコンパイラが型を決める仕組み。この場合 n の型は int に決まるため、後から String を代入するとコンパイルエラーになる。

・決まった型は後から変えられない、が var の本質`,
verify: { file: "Main.java", compileError: true } });

// Q14 [2-2]
add({ tag: "2-2", cat: "2-2 ローカル変数型推論（var）",
text: "var を使った宣言のうち、コンパイルエラーになるものはどれか。",
code: null,
choices: ["var price = 500;", "var name = null;", "var data = new int[] {1, 2, 3};", "for (var i = 0; i < 3; i++) { }"],
answers: [1],
expl:
`正解: var name = null;

var は右辺から型を推論するので、型を決められない null を右辺に置くとコンパイルエラーになる。

・配列は new int[] {...} のように型を明示すれば使える（初期化子だけの省略形は不可）
・for 文の初期化部でも var は使える`,
verify: { snippets: ["var price = 500;", "var name = null;", "var data = new int[] {1, 2, 3};", "for (var i = 0; i < 3; i++) { }"], snippetOk: [true, false, true, true], snippetAnswer: "error" } });

// Q15 [2-3]
add({ tag: "2-3", cat: "2-3 文字列の作成と操作",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        String s = "java";
        s.toUpperCase();
        s.concat("17");
        System.out.println(s);
    }
}`,
choices: ["java", "JAVA", "java17", "JAVA17"],
answers: [0],
expl:
`正解: java

String は不変（immutable）。toUpperCase() や concat() は新しい文字列を作って返すだけで、元の s は変わらない。戻り値を受け取っていないので、何も変化しない。

・結果を使いたい場合は s = s.toUpperCase(); のように代入し直す必要がある`,
verify: { file: "Main.java", run: ["Main"], stdout: "java" } });

// Q16 [2-3]
add({ tag: "2-3", cat: "2-3 文字列の作成と操作",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        String a = "hello";
        String b = new String("hello");
        String c = "hello";
        System.out.println((a == b) + " " + (a == c) + " " + a.equals(b));
    }
}`,
choices: ["false true true", "true true true", "false false true", "true false true"],
answers: [0],
expl:
`正解: false true true

== は参照（同じオブジェクトかどうか）の比較。リテラル同士は文字列プールで共有されるため a == c は true になるが、new String(...) で作った b は別のオブジェクトなので a == b は false。中身の比較は equals を使う（a.equals(b) は true）。

・「リテラルなら == でも一致する」ことだけ覚えていると、new した場合に引っかかる`,
verify: { file: "Main.java", run: ["Main"], stdout: "false true true" } });

// Q17 [2-3]
add({ tag: "2-3", cat: "2-3 文字列の作成と操作",
text: "次のコードの実行結果はどれか。",
code:
"public class Main {\n    public static void main(String[] args) {\n        String s = \"\"\"\n                ab\n                cd\n                \"\"\";\n        System.out.println(s.length());\n    }\n}",
choices: ["6", "5", "7", "コンパイルエラーになる"],
answers: [0],
expl:
`正解: 6

テキストブロックでは、各行と閉じ括弧に共通するインデントが取り除かれる。この場合 s の中身は ab、改行、cd、改行となり、長さは 2+1+2+1 の 6 になる。

・最後の行の後にも改行が入る（閉じ括弧が次の行にあるため）点が引っかけ`,
verify: { file: "Main.java", run: ["Main"], stdout: "6" } });

// Q18 [2-3]
add({ tag: "2-3", cat: "2-3 文字列の作成と操作",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("abc");
        sb.delete(0, 1).append("X");
        System.out.println(sb);
    }
}`,
choices: ["bcX", "abcX", "Xbc", "コンパイルエラーになる"],
answers: [0],
expl:
`正解: bcX

StringBuilder は可変で、delete や append は自分自身を書き換えて自分自身を返す。delete(0, 1) は開始位置0から終了位置1の手前まで（つまり先頭の a）を取り除き、bc になったところへ X を追加する。

・delete の範囲は「開始を含む・終了を含まない」。substring などと同じ約束`,
verify: { file: "Main.java", run: ["Main"], stdout: "bcX" } });

// Q19 [2-4]
add({ tag: "2-4", cat: "2-4 配列の使用",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        int[][] arr = new int[2][];
        arr[0] = new int[] {1, 2, 3};
        arr[1] = new int[] {4};
        System.out.println(arr[0].length + arr[1].length);
    }
}`,
choices: ["4", "3", "6", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: 4

二次元配列は「配列の配列」。new int[2][] のように後ろの要素数を空にしておくと、行ごとに異なる長さの配列を後から代入できる。arr[0] の長さ3と arr[1] の長さ1で合計4。

・行を代入する前に arr[0].length を読むと NullPointerException になるが、このコードでは代入済み`,
verify: { file: "Main.java", run: ["Main"], stdout: "4" } });

// Q20 [2-4]
add({ tag: "2-4", cat: "2-4 配列の使用",
text: "次のコードをコンパイル・実行するとどうなるか。",
code:
`public class Main {
    public static void main(String[] args) {
        int[] nums = {10, 20, 30};
        for (int i = 0; i <= nums.length; i++) {
            System.out.print(nums[i] + " ");
        }
    }
}`,
choices: ["10 20 30 と出力された後、ArrayIndexOutOfBoundsException が発生する", "10 20 30 と出力されて正常に終了する", "コンパイルエラーになる", "何も出力されずに例外が発生する"],
answers: [0],
expl:
`正解: 10 20 30 と出力された後、ArrayIndexOutOfBoundsException が発生する

length は 3 だが、条件が i <= nums.length のため i が 3 のときにもループに入り、存在しない nums[3] を読んで実行時例外になる。配列の範囲外アクセスはコンパイルでは検出できず、実行時に例外になる。

・条件は i < nums.length が正しい形。<= と書くのが定番の引っかけ`,
verify: { file: "Main.java", run: ["Main"], stdout: "10 20 30", exception: "ArrayIndexOutOfBoundsException" } });

// Q21 [2-5]
add({ tag: "2-5", cat: "2-5 ArrayListの使用",
text: "次のコードの実行結果はどれか。",
code:
`import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(10);
        list.add(20);
        list.add(30);
        list.remove(1);
        System.out.println(list);
    }
}`,
choices: ["[10, 30]", "[20, 30]", "[10, 20]", "コンパイルエラーになる"],
answers: [0],
expl:
`正解: [10, 30]

remove(1) は「値が1の要素」ではなく「インデックス1の要素」を取り除く。インデックス1は 20 なので、残りは [10, 30]。

・ArrayList 最大の引っかけ。値で消したい場合は remove(Integer.valueOf(1)) のように Object として渡す`,
verify: { file: "Main.java", run: ["Main"], stdout: "[10, 30]" } });

// Q22 [2-5]
add({ tag: "2-5", cat: "2-5 ArrayListの使用",
text: "次のコードの実行結果はどれか。",
code:
`import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("A");
        list.add("B");
        list.set(0, "C");
        System.out.println(list.size() + list.get(1));
    }
}`,
choices: ["2B", "2C", "CB", "コンパイルエラーになる"],
answers: [0],
expl:
`正解: 2B

set は要素の置き換えで、要素数は増えない。リストは [C, B] になり、size() は 2、get(1) は B。int と String の + は文字列連結になるので 2B と出力される。

・add と set の違い（追加か置き換えか）と、size がメソッドである点がポイント`,
verify: { file: "Main.java", run: ["Main"], stdout: "2B" } });

// Q23 [2-5]
add({ tag: "2-5", cat: "2-5 ArrayListの使用",
text: "次のコードをコンパイル・実行するとどうなるか。",
code:
`import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("a", "b", "c"));
        for (String s : list) {
            if (s.equals("b")) {
                list.remove(s);
            }
        }
        System.out.println(list);
    }
}`,
choices: ["[a, c] と出力され、例外は発生しない", "ConcurrentModificationException が発生する", "[a, b] と出力される", "コンパイルエラーになる"],
answers: [0],
expl:
`正解: [a, c] と出力され、例外は発生しない

拡張for の途中で remove すると通常は ConcurrentModificationException になるが、これは「次の要素を取り出すとき」に変更が検出されるため。ここでは b を取り除いた時点で残りの要素がなくなり、次を取り出す処理自体が起きないので、例外にならずにループが終わる。

・「拡張for中のremoveは必ず例外」と覚えていると引っかかる。末尾に近い要素を消した場合だけ起きる現象`,
verify: { file: "Main.java", run: ["Main"], stdout: "[a, c]" } });

// ================= 主題3 =================
// Q24 [3-1]
add({ tag: "3-1", cat: "3-1 分岐文（if・switch文）",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        boolean b = false;
        if (b = true) {
            System.out.println("yes");
        } else {
            System.out.println("no");
        }
    }
}`,
choices: ["yes", "no", "コンパイルエラーになる", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: yes

if の条件は boolean でなければならないが、b = true は比較ではなく代入で、代入式全体の値は代入した値（true）になる。そのため条件が真として扱われ、yes が出力される。

・数値型で同じことを書くとコンパイルエラーになるが、boolean 変数への代入だけは通ってしまう点が引っかけ`,
verify: { file: "Main.java", run: ["Main"], stdout: "yes" } });

// Q25 [3-1]
add({ tag: "3-1", cat: "3-1 分岐文（if・switch文）",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        int n = 2;
        switch (n) {
            default: System.out.print("D");
            case 1: System.out.print("1"); break;
            case 2: System.out.print("2");
            case 3: System.out.print("3"); break;
        }
    }
}`,
choices: ["23", "D23", "2", "3"],
answers: [0],
expl:
`正解: 23

n は 2 なので case 2 から実行が始まる。case 2 には break がないため case 3 へ落ちて（フォールスルー）、3 も出力してから break で抜ける。

・default は先頭に書かれていても、一致する case があればそちらが優先される。default は「どれにも一致しないときの入口」にすぎない`,
verify: { file: "Main.java", run: ["Main"], stdout: "23" } });

// Q26 [3-2]
add({ tag: "3-2", cat: "3-2 繰り返し文",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        int i = 10;
        do {
            System.out.print(i);
            i++;
        } while (i < 5);
    }
}`,
choices: ["10", "何も出力されない", "10から14まで出力される", "無限ループになる"],
answers: [0],
expl:
`正解: 10

do-while は条件判定が後ろにあるため、条件が最初から false でも最低1回は実行される。10 を出力して i が 11 になり、条件 i < 5 が false なのでループを抜ける。

・while 文なら何も出力されない。do-while との違いは「最低1回実行されるか」`,
verify: { file: "Main.java", run: ["Main"], stdout: "10" } });

// Q27 [3-2]
add({ tag: "3-2", cat: "3-2 繰り返し文",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};
        for (int n : arr) {
            n = n * 10;
        }
        System.out.println(arr[0] + " " + arr[2]);
    }
}`,
choices: ["1 3", "10 30", "10 3", "コンパイルエラーになる"],
answers: [0],
expl:
`正解: 1 3

拡張for のループ変数 n には、配列の要素の値のコピーが入る。n を書き換えても、元の配列 arr の中身は変わらない。

・参照型の要素なら「参照のコピー」を通して中身を変えられるが、プリミティブ型の要素は値のコピーなので影響しない`,
verify: { file: "Main.java", run: ["Main"], stdout: "1 3" } });

// Q28 [3-3]
add({ tag: "3-3", cat: "3-3 break・continueとラベル",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        outer:
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (j == 1) {
                    break outer;
                }
                System.out.print(i + ":" + j + " ");
            }
        }
    }
}`,
choices: ["0:0 ", "0:0 1:0 2:0 ", "0:0 0:1 0:2 ", "コンパイルエラーになる"],
answers: [0],
expl:
`正解: 0:0 （末尾にスペース）

ラベル付き break は、指定したラベルのループ全体を抜ける。i=0, j=0 で 0:0 を出力し、j=1 で break outer により外側のループごと終了する。

・ラベルなしの break なら内側のループだけを抜けて 0:0 1:0 2:0 になる。その違いを問う問題`,
verify: { file: "Main.java", run: ["Main"], stdout: "0:0" } });

// Q29 [3-3]
add({ tag: "3-3", cat: "3-3 break・continueとラベル",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            if (i % 2 == 0) {
                continue;
            }
            System.out.print(i);
        }
    }
}`,
choices: ["13", "024", "01234", "135"],
answers: [0],
expl:
`正解: 13

continue はその周回の残りを飛ばして次の周回へ進む。i が偶数（0, 2, 4）のときは出力が飛ばされ、奇数の 1 と 3 だけが出力される。

・break と違い、ループ自体は終わらない点がポイント`,
verify: { file: "Main.java", run: ["Main"], stdout: "13" } });

// Q30 [3-4]
add({ tag: "3-4", cat: "3-4 switch式",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        int day = 6;
        String type = switch (day) {
            case 1, 2, 3, 4, 5 -> "weekday";
            case 6, 7 -> "weekend";
            default -> "unknown";
        };
        System.out.println(type);
    }
}`,
choices: ["weekend", "weekday", "unknown", "コンパイルエラーになる"],
answers: [0],
expl:
`正解: weekend

switch式では、case に複数のラベルをカンマで並べられる。day は 6 なので case 6, 7 に一致し、weekend が返る。アロー形式ではフォールスルーは起きない。

・default があるため網羅性も満たしている`,
verify: { file: "Main.java", run: ["Main"], stdout: "weekend" } });

// Q31 [3-4]
add({ tag: "3-4", cat: "3-4 switch式",
text: "次のコードをコンパイル・実行するとどうなるか。",
code:
`public class Main {
    public static void main(String[] args) {
        int x = 9;
        switch (x) {
            case 1 -> System.out.println("one");
            case 2 -> System.out.println("two");
        }
        System.out.println("done");
    }
}`,
choices: ["done とだけ出力される", "コンパイルエラーになる（すべてのケースを網羅していない）", "実行時に例外が発生する", "何も出力されない"],
answers: [0],
expl:
`正解: done とだけ出力される

この switch は値を返す「式」ではなく、文として使われている。文として使う場合は全ケースの網羅は不要で、default がなくてもコンパイルできる。x は 9 でどの case にも一致しないため、done だけが出力される。

・網羅が必須なのは switch「式」。式か文かを見分けることが引っかけ`,
verify: { file: "Main.java", run: ["Main"], stdout: "done" } });

// Q32 [3-5]
add({ tag: "3-5", cat: "3-5 演算子",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        int i = 5;
        int j = i++ + ++i;
        System.out.println(i + " " + j);
    }
}`,
choices: ["7 12", "6 11", "7 11", "6 12"],
answers: [0],
expl:
`正解: 7 12

式は左から評価される。i++ は「使ってから増える」ので、この時点では 5 が使われ、i は 6 になる。続く ++i は「増やしてから使う」ので i が 7 になり、7 が使われる。j は 5 + 7 で 12、最終的な i は 7。

・前置と後置で「値が変わるタイミング」が違うことがポイント`,
verify: { file: "Main.java", run: ["Main"], stdout: "7 12" } });

// Q33 [3-5]
add({ tag: "3-5", cat: "3-5 演算子",
text: "次のコードをコンパイル・実行するとどうなるか。",
code:
`public class Main {
    public static void main(String[] args) {
        int a = 0;
        boolean r = (a != 0) && (10 / a > 1);
        System.out.println(r);
    }
}`,
choices: ["false と出力される", "true と出力される", "ArithmeticException が発生する", "コンパイルエラーになる"],
answers: [0],
expl:
`正解: false と出力される

&& は短絡評価で、左辺が false なら右辺は評価されない。a != 0 は false なので、ゼロ除算を含む右辺 10 / a は実行されず、例外は発生しない。

・& を使うと両辺が評価されて ArithmeticException になる。&& と & の違いが引っかけ`,
verify: { file: "Main.java", run: ["Main"], stdout: "false" } });

// Q34 [3-5]
add({ tag: "3-5", cat: "3-5 演算子",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    public static void main(String[] args) {
        Object o = true ? Integer.valueOf(10) : Double.valueOf(2.5);
        System.out.println(o);
    }
}`,
choices: ["10.0", "10", "2.5", "コンパイルエラーになる"],
answers: [0],
expl:
`正解: 10.0

三項演算子の両辺が数値型（のラッパー）の場合、結果の型は型昇格で決まる。Integer と Double なら double に統一されるため、選ばれた 10 も double の 10.0 として扱われ、出力も 10.0 になる。

・「true なのだから Integer の 10 がそのまま返る」と考えると引っかかる。三項演算子は値だけでなく型も決まる`,
verify: { file: "Main.java", run: ["Main"], stdout: "10.0" } });

// ================= 主題4 =================
// Q35 [4-1]
add({ tag: "4-1", cat: "4-1 クラスの定義と初期化の順序",
text: "次のコードの実行結果はどれか。",
code:
`class Parent {
    static {
        System.out.print("P-static ");
    }
    {
        System.out.print("P-init ");
    }
    Parent() {
        System.out.print("P-ctor ");
    }
}

class Child extends Parent {
    static {
        System.out.print("C-static ");
    }
    {
        System.out.print("C-init ");
    }
    Child() {
        System.out.print("C-ctor ");
    }
}

public class Main {
    public static void main(String[] args) {
        new Child();
    }
}`,
choices: ["P-static C-static P-init P-ctor C-init C-ctor", "C-static P-static P-init P-ctor C-init C-ctor", "P-static C-static C-init C-ctor P-init P-ctor", "コンパイルエラーになる"],
answers: [0],
expl:
`正解: P-static C-static P-init P-ctor C-init C-ctor

初期化の順序は決まっている。まずクラス読み込み時に static 初期化が親から子へ1回ずつ。次にインスタンス生成のたびに、親のフィールド初期化・初期化ブロック→親のコンストラクタ→子のフィールド初期化・初期化ブロック→子のコンストラクタ、の順に進む。

・「親が常に先」「static はクラスの読み込み時に1回だけ」の2点で並び替えられる`,
verify: { file: "Main.java", run: ["Main"], stdout: "P-static C-static P-init P-ctor C-init C-ctor" } });

// Q36 [4-1]
add({ tag: "4-1", cat: "4-1 クラスの定義と初期化の順序",
text: "次のコードで、\"a\" の文字列オブジェクトがガベージコレクションの対象になるのは、どの行が実行された時点か。",
code:
`public class Main {
    public static void main(String[] args) {
        String s1 = new String("a");   // A
        String s2 = new String("b");   // B
        s1 = s2;                       // C
        s2 = null;                     // D
    }
}`,
choices: ["A の行の後", "B の行の後", "C の行の後", "D の行の後"],
answers: [2],
expl:
`正解: C の行の後

オブジェクトは、どこからも参照されなくなった時点で GC の対象になる。"a" のオブジェクトを指しているのは s1 だけなので、s1 が "b" のオブジェクトを指すようになる C の行の時点で、"a" は参照を失う。

・D の行は "b" のオブジェクトに対する操作で、"a" には関係しない。なお「対象になる」ことと「実際に回収される」ことは別で、回収のタイミングは保証されない`,
verify: null });

// Q37 [4-2]
add({ tag: "4-2", cat: "4-2 メソッドとコンストラクタ",
text: "次のコードをコンパイルするとどうなるか。",
code:
`class Book {
    Book(String title) {
    }
}

public class Main {
    public static void main(String[] args) {
        Book b = new Book();
        System.out.println("created");
    }
}`,
choices: ["コンパイルエラーになる", "created と出力される", "実行時に例外が発生する", "何も出力されない"],
answers: [0],
expl:
`正解: コンパイルエラーになる

デフォルトコンストラクタ（引数なし）が自動で用意されるのは、コンストラクタを1つも書いていない場合だけ。Book(String) を書いた時点で、引数なしのコンストラクタは存在しなくなるため、new Book() はエラーになる。

・「デフォルトコンストラクタは常にある」という誤解が引っかけ`,
verify: { file: "Main.java", compileError: true } });

// Q38 [4-2]
add({ tag: "4-2", cat: "4-2 メソッドとコンストラクタ",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
    static void change(int x, StringBuilder sb) {
        x = 99;
        sb.append("!");
    }

    public static void main(String[] args) {
        int n = 1;
        StringBuilder sb = new StringBuilder("go");
        change(n, sb);
        System.out.println(n + " " + sb);
    }
}`,
choices: ["1 go!", "99 go!", "1 go", "99 go"],
answers: [0],
expl:
`正解: 1 go!

Java の引数は値渡しのみ。int の n はコピーが渡るので、メソッド内で x を書き換えても呼び出し側は変わらない。一方 StringBuilder は「参照の値（コピー）」が渡るため、参照先のオブジェクト自体を書き換える append は呼び出し側にも反映される。

・参照そのものを別のオブジェクトに付け替えることはできないが、参照先の中身は変えられる、という区別がポイント`,
verify: { file: "Main.java", run: ["Main"], stdout: "1 go!" } });

// Q39 [4-3]
add({ tag: "4-3", cat: "4-3 メソッドのオーバーロード",
text: "次のコードの実行結果はどれか。",
code:
`class Calc {
    void show(long n) {
        System.out.println("long");
    }
    void show(Integer n) {
        System.out.println("Integer");
    }
}

public class Main {
    public static void main(String[] args) {
        new Calc().show(10);
    }
}`,
choices: ["long", "Integer", "コンパイルエラーになる（呼び出しが曖昧）", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: long

オーバーロードの解決は、完全一致→型の拡大変換→ボクシング→可変長引数、の順に優先される。int の 10 は long への拡大変換がボクシング（Integer化）より先に検討されるため、show(long) が選ばれる。

・「Integer のほうが int に近い」という感覚が引っかけ。優先順位は変換の種類で決まっている`,
verify: { file: "Main.java", run: ["Main"], stdout: "long" } });

// Q40 [4-3]
add({ tag: "4-3", cat: "4-3 メソッドのオーバーロード",
text: "次のコードの実行結果はどれか。",
code:
`class Printer {
    void print(String s) {
        System.out.println("single");
    }
    void print(String... vals) {
        System.out.println("varargs:" + vals.length);
    }
}

public class Main {
    public static void main(String[] args) {
        Printer p = new Printer();
        p.print("a");
        p.print("a", "b");
    }
}`,
choices: ["single と varargs:2 が出力される", "varargs:1 と varargs:2 が出力される", "コンパイルエラーになる", "single が2回出力される"],
answers: [0],
expl:
`正解: single と varargs:2 が出力される

可変長引数は優先順位が最も低く、通常のメソッドで解決できる呼び出しはそちらが選ばれる。print("a") は print(String) に完全一致するので single、print("a", "b") は引数が2つなので可変長引数版が選ばれ varargs:2 になる。

・可変長引数は「他に合うものがないときの受け皿」と覚える`,
verify: { file: "Main.java", run: ["Main"], stdout: "single\nvarargs:2" } });

// Q41 [4-4]
add({ tag: "4-4", cat: "4-4 static変数とstaticメソッド",
text: "次のコードをコンパイルするとどうなるか。",
code:
`public class Main {
    int value = 10;

    static void show() {
        System.out.println(value);
    }

    public static void main(String[] args) {
        show();
    }
}`,
choices: ["コンパイルエラーになる", "10 と出力される", "0 と出力される", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: コンパイルエラーになる

static メソッドは特定のインスタンスに属さないため、その中からインスタンス変数 value を直接参照できない（どのオブジェクトの value か決まらない）。this も使えない。

・逆に、インスタンスメソッドから static メンバーを使うことは可能。方向の非対称性が引っかけ`,
verify: { file: "Main.java", compileError: true } });

// Q42 [4-5]
add({ tag: "4-5", cat: "4-5 アクセス修飾子",
text: "次の2つのファイルをコンパイルするとどうなるか。",
code:
`// ファイル: packa/Base.java
package packa;

public class Base {
    protected int num = 42;
}

// ファイル: packb/Sub.java
package packb;

import packa.Base;

public class Sub extends Base {
    public static void main(String[] args) {
        Base b = new Base();
        System.out.println(b.num);
    }
}`,
choices: ["コンパイルエラーになる", "42 と出力される", "0 と出力される", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: コンパイルエラーになる

protected メンバーは、同一パッケージ内か、継承先からアクセスできる。ただし別パッケージの継承先では、「自分の型（またはそのサブクラス）の参照」を通してでなければアクセスできない。このコードは Base 型の参照 b を通してアクセスしているため、エラーになる。

・Sub 型の参照を通せばアクセスできる、という細かい条件が protected 最大の引っかけ`,
verify: { files: { "packa/Base.java": "package packa;\n\npublic class Base {\n    protected int num = 42;\n}\n", "packb/Sub.java": "package packb;\n\nimport packa.Base;\n\npublic class Sub extends Base {\n    public static void main(String[] args) {\n        Base b = new Base();\n        System.out.println(b.num);\n    }\n}\n" }, compileError: true } });

// Q43 [4-6]
add({ tag: "4-6", cat: "4-6 instanceofのパターンマッチング",
text: "次のコードをコンパイルするとどうなるか。",
code:
`public class Main {
    public static void main(String[] args) {
        Object o = "text";
        if (o instanceof String s || s.length() > 2) {
            System.out.println("yes");
        }
    }
}`,
choices: ["コンパイルエラーになる", "yes と出力される", "何も出力されない", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: コンパイルエラーになる

パターン変数 s が使えるのは、instanceof が true であることが保証される範囲だけ。|| の右辺は「左辺が false のとき」に評価されるため、そこでは s が存在せず、コンパイルエラーになる。

・&& の右辺では使える（左辺が true のときだけ評価される）。&& と || で逆になる点が引っかけ`,
verify: { file: "Main.java", compileError: true } });

// Q44 [4-7]
add({ tag: "4-7", cat: "4-7 レコードクラス",
text: "次のコードの実行結果はどれか。",
code:
`record Item(String name, int price) {
}

public class Main {
    public static void main(String[] args) {
        Item a = new Item("pen", 100);
        Item b = new Item("pen", 100);
        System.out.println(a.equals(b) + " " + (a == b));
    }
}`,
choices: ["true false", "true true", "false false", "コンパイルエラーになる"],
answers: [0],
expl:
`正解: true false

record では equals が自動生成され、すべてのコンポーネント（name と price）が一致すれば true になる。一方 == は参照の比較なので、別々に生成した a と b では false。

・通常のクラスでは equals も参照比較がデフォルト。record は中身で比較される点が特徴`,
verify: { file: "Main.java", run: ["Main"], stdout: "true false" } });

// ================= 主題5 =================
// Q45 [5-1]
add({ tag: "5-1", cat: "5-1 スーパークラスとサブクラス",
text: "クラスの継承に関する説明として、正しいものはどれか。",
code: null,
choices: ["クラスは複数のクラスを直接 extends できる", "private メソッドはサブクラスに継承される", "すべてのクラスは、直接または間接的に java.lang.Object を継承している", "コンストラクタはサブクラスに継承される"],
answers: [2],
expl:
`正解: すべてのクラスは、直接または間接的に java.lang.Object を継承している

・クラスが直接継承できるのは1つだけ。多重継承ができるのはインタフェースの実装のみ
・private メンバーはサブクラスから見えないため、継承の対象にならない
・コンストラクタも継承されない。サブクラスのコンストラクタからは super() で親のコンストラクタを呼び出す`,
verify: null});

// Q46 [5-2]
add({ tag: "5-2", cat: "5-2 抽象クラス",
text: "次のコードの実行結果はどれか。",
code:
`abstract class Animal {
abstract void cry();

void sleep() {
System.out.println("zzz");
}
}

class Cat extends Animal {
void cry() {
System.out.println("meow");
}
}

public class Main {
public static void main(String[] args) {
Animal a = new Cat();
a.cry();
a.sleep();
}
}`,
choices: ["meow と zzz が出力される", "コンパイルエラーになる", "zzz だけ出力される", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: meow と zzz が出力される

抽象クラスはインスタンス化できないが、参照型として使うことはできる。cry() は実体である Cat の実装が呼ばれ、sleep() は Animal の通常メソッドがそのまま呼ばれる。

・抽象クラスにも通常のメソッドやコンストラクタは持てる。「抽象クラスは全部抽象」という誤解が引っかけ`,
verify: { file: "Main.java", run: ["Main"], stdout: "meow\nzzz"}});

// Q47 [5-3]
add({ tag: "5-3", cat: "5-3 メソッドのオーバーライド",
text: "次のコードをコンパイルするとどうなるか。",
code:
`class Parent {
public void greet() {
System.out.println("hi");
}
}

class Child extends Parent {
protected void greet() {
System.out.println("hey");
}
}

public class Main {
public static void main(String[] args) {
new Child().greet();
}
}`,
choices: ["コンパイルエラーになる", "hey と出力される", "hi と出力される", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: コンパイルエラーになる

オーバーライドでは、アクセス修飾子を親より狭くすることはできない。親が public なのに子で protected に弱めているため、コンパイルエラーになる。

・広くする（protected → public）ことは可能。方向を取り違えると引っかかる`,
verify: { file: "Main.java", compileError: true}});

// Q48 [5-4]
add({ tag: "5-4", cat: "5-4 キャストとポリモーフィズム",
text: "次のコードの実行結果はどれか。",
code:
`class Parent {
String name = "parent";

String who() {
return "parent";
}
}

class Child extends Parent {
String name = "child";

String who() {
return "child";
}
}

public class Main {
public static void main(String[] args) {
Parent p = new Child();
System.out.println(p.name + " " + p.who());
}
}`,
choices: ["parent child", "child child", "parent parent", "child parent"],
answers: [0],
expl:
`正解: parent child

メソッド呼び出しは実体のクラス（Child）で決まるが、フィールド参照は参照変数の型（Parent）で決まる。この非対称性が最頻出の引っかけ。

・p.name は Parent のフィールド、p.who() は Child のオーバーライドが呼ばれる`,
verify: { file: "Main.java", run: ["Main"], stdout: "parent child"}});

// Q49 [5-4]
add({ tag: "5-4", cat: "5-4 キャストとポリモーフィズム",
text: "次のコードをコンパイル・実行するとどうなるか。",
code:
`class Parent {
}

class Child extends Parent {
}

public class Main {
public static void main(String[] args) {
Parent p = new Parent();
Child c = (Child) p;
System.out.println("ok");
}
}`,
choices: ["実行時に ClassCastException が発生する", "ok と出力される", "コンパイルエラーになる", "実行時に NullPointerException が発生する"],
answers: [0],
expl:
`正解: 実行時に ClassCastException が発生する

Parent から Child へのダウンキャストは、継承関係があるためコンパイルは通る。しかし実体は Parent のオブジェクトなので、実行時にキャストできず ClassCastException になる。

・「コンパイルが通る＝キャストできる」ではない。実体が何かで実行時に判定される`,
verify: { file: "Main.java", run: ["Main"], stdout: "", exception: "ClassCastException"}});

// Q50 [5-5]
add({ tag: "5-5", cat: "5-5 finalクラスとfinal変数",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
public static void main(String[] args) {
final StringBuilder sb = new StringBuilder("a");
sb.append("b");
System.out.println(sb);
}
}`,
choices: ["ab", "コンパイルエラーになる", "a", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: ab

final 変数で禁止されるのは「再代入」だけ。参照型の場合、参照先のオブジェクトの中身を変更することはできる。sb に別の StringBuilder を代入し直すとエラーになるが、append で中身を変えるのは問題ない。

・final は「変数が不変」ではなく「代入が1回だけ」という意味`,
verify: { file: "Main.java", run: ["Main"], stdout: "ab"}});

// Q51 [5-6]
add({ tag: "5-6", cat: "5-6 インタフェースの作成と実装",
text: "次のコードをコンパイルするとどうなるか。",
code:
`interface Flyable {
void fly();
}

class Bird implements Flyable {
void fly() {
System.out.println("fly");
}
}

public class Main {
public static void main(String[] args) {
new Bird().fly();
}
}`,
choices: ["コンパイルエラーになる", "fly と出力される", "実行時に例外が発生する", "何も出力されない"],
answers: [0],
expl:
`正解: コンパイルエラーになる

インタフェースのメソッドは暗黙に public abstract。実装する側は public を付けて実装しなければならず、アクセス修飾子を省略して弱めるとコンパイルエラーになる。

・インタフェース側に public と書かれていなくても public 扱い、という暗黙の修飾子が引っかけ`,
verify: { file: "Main.java", compileError: true}});

// Q52 [5-7]
add({ tag: "5-7", cat: "5-7 デフォルトメソッドとprivateメソッド",
text: "次のコードをコンパイルするとどうなるか。",
code:
`interface A {
default String hello() {
return "A";
}
}

interface B {
default String hello() {
return "B";
}
}

class C implements A, B {
}

public class Main {
public static void main(String[] args) {
System.out.println(new C().hello());
}
}`,
choices: ["コンパイルエラーになる", "A と出力される", "B と出力される", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: コンパイルエラーになる

2つのインタフェースから同じシグネチャの default メソッドを継承すると衝突し、クラス側でオーバーライドして解決しない限りコンパイルエラーになる。

・解決する場合は、C の中で hello() を実装し直す（A.super.hello() のように片方を呼ぶこともできる）`,
verify: { file: "Main.java", compileError: true}});

// Q53 [5-8]
add({ tag: "5-8", cat: "5-8 シールクラス",
text: "次のコードをコンパイルするとどうなるか。",
code:
`sealed class Vehicle permits Car, Truck {
}

final class Car extends Vehicle {
}

final class Truck extends Vehicle {
}

final class Bus extends Vehicle {
}

public class Main {
public static void main(String[] args) {
System.out.println("ok");
}
}`,
choices: ["コンパイルエラーになる", "ok と出力される", "Bus の宣言に警告が出るがコンパイルできる", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: コンパイルエラーになる

sealed クラスを継承できるのは、permits に列挙されたクラスだけ。Bus は列挙されていないため、Vehicle を継承できずコンパイルエラーになる。

・列挙された側（Car、Truck）は final / sealed / non-sealed のいずれかを宣言する義務があり、ここでは final が付いているので問題ない`,
verify: { file: "Main.java", compileError: true}});

// ================= 主題6 =================
// Q54 [6-1] 複数選択
add({ tag: "6-1", cat: "6-1 例外の仕組みと例外クラス階層",
text: "非チェック例外（RuntimeException またはそのサブクラス）であるものをすべて選べ。",
code: null,
choices: ["IOException", "NullPointerException", "ClassNotFoundException", "ArithmeticException", "StackOverflowError"],
answers: [1, 3],
expl:
`正解: NullPointerException ／ ArithmeticException

どちらも RuntimeException のサブクラスで、catch も throws も必須ではない。

・IOException と ClassNotFoundException は Exception 直下のチェック例外
・StackOverflowError は例外ではなく Error のサブクラス。例外と Error は別物という点が引っかけ`,
verify: { hierarchy: ["java.io.IOException", "java.lang.NullPointerException", "java.lang.ClassNotFoundException", "java.lang.ArithmeticException", "java.lang.StackOverflowError"]}});

// Q55 [6-2]
add({ tag: "6-2", cat: "6-2 try-catch文による例外処理",
text: "次のコードの実行結果はどれか。",
code:
`public class Main {
static int test() {
try {
return 1;
} finally {
System.out.print("F");
}
}

public static void main(String[] args) {
System.out.print(test());
}
}`,
choices: ["F1", "1F", "1", "コンパイルエラーになる"],
answers: [0],
expl:
`正解: F1

finally は、try から return で抜ける場合でも必ず実行される。test() の戻り値 1 が確定した後、呼び出し側で出力される前に finally の F が出力されるため、F1 の順になる。

・finally が実行されない代表例は System.exit() が呼ばれた場合`,
verify: { file: "Main.java", run: ["Main"], stdout: "F1"}});

// Q56 [6-2]
add({ tag: "6-2", cat: "6-2 try-catch文による例外処理",
text: "次のコードをコンパイルするとどうなるか。",
code:
`public class Main {
public static void main(String[] args) {
try {
int[] a = new int[2];
System.out.println(a[5]);
} catch (RuntimeException e) {
System.out.println("runtime");
} catch (ArrayIndexOutOfBoundsException e) {
System.out.println("index");
}
}
}`,
choices: ["コンパイルエラーになる", "runtime と出力される", "index と出力される", "実行時に例外がそのまま伝播する"],
answers: [0],
expl:
`正解: コンパイルエラーになる

catch は上から順に判定される。親クラス RuntimeException の catch が先にあると、その子である ArrayIndexOutOfBoundsException の catch には絶対に到達しないため、到達不能コードとしてコンパイルエラーになる。

・catch は「子から親へ」の順に書くのが規則`,
verify: { file: "Main.java", compileError: true}});

// Q57 [6-3]
add({ tag: "6-3", cat: "6-3 try-with-resources文",
text: "次のコードの実行結果はどれか。",
code:
`class Res implements AutoCloseable {
private String name;

Res(String name) {
this.name = name;
}

public void close() {
System.out.print("close:" + name + " ");
}
}

public class Main {
public static void main(String[] args) {
try (Res r1 = new Res("1"); Res r2 = new Res("2")) {
System.out.print("body ");
}
}
}`,
choices: ["body close:2 close:1", "body close:1 close:2", "close:2 close:1 body", "コンパイルエラーになる"],
answers: [0],
expl:
`正解: body close:2 close:1

try-with-resources では、本体の処理が終わった後、リソースが「開いた順の逆」に自動で close される。先に開いた r1 は後に閉じられ、後に開いた r2 が先に閉じられる。

・close の順序が宣言順と逆になる点が引っかけ`,
verify: { file: "Main.java", run: ["Main"], stdout: "body close:2 close:1"}});

// Q58 [6-4]
add({ tag: "6-4", cat: "6-4 カスタム例外の作成",
text: "次のコードをコンパイルするとどうなるか。",
code:
`class MyError extends Exception {
MyError(String msg) {
super(msg);
}
}

public class Main {
static void check(int n) {
if (n < 0) {
throw new MyError("neg");
}
System.out.println("ok");
}

public static void main(String[] args) {
check(1);
}
}`,
choices: ["コンパイルエラーになる", "ok と出力される", "実行時に MyError がスローされる", "何も出力されない"],
answers: [0],
expl:
`正解: コンパイルエラーになる

Exception を継承したカスタム例外はチェック例外になる。チェック例外を throw するメソッドには、catch で処理するか、throws で宣言することが必須。check() にはどちらもないため、実際に例外が発生するかどうかに関係なくコンパイルエラーになる。

・RuntimeException を継承すれば非チェック例外になり、この制約は受けない`,
verify: { file: "Main.java", compileError: true}});

// Q59 [6-5]
add({ tag: "6-5", cat: "6-5 multi-catch句",
text: "次のコードをコンパイルするとどうなるか。",
code:
`public class Main {
public static void main(String[] args) {
try {
String s = null;
System.out.println(s.length());
} catch (RuntimeException | NullPointerException e) {
System.out.println("caught");
}
}
}`,
choices: ["コンパイルエラーになる", "caught と出力される", "実行時に NullPointerException がそのまま伝播する", "何も出力されない"],
answers: [0],
expl:
`正解: コンパイルエラーになる

multi-catch では、継承関係にある型同士を並べることはできない。NullPointerException は RuntimeException のサブクラスなので、この組み合わせはコンパイルエラーになる。

・親クラス側だけで受けるか、無関係な型同士（例: IOException | SQLException）を並べるのが正しい使い方`,
verify: { file: "Main.java", compileError: true}});

// Q60 [6-6]
add({ tag: "6-6", cat: "6-6 例外とオーバーライドの規則",
text: "次のコードをコンパイルするとどうなるか。",
code:
`import java.io.IOException;

class Parent {
void read() throws IOException {
}
}

class Child extends Parent {
void read() throws Exception {
}
}

public class Main {
public static void main(String[] args) {
System.out.println("ok");
}
}`,
choices: ["コンパイルエラーになる", "ok と出力される", "Parent でコンパイルエラーになる", "実行時に例外が発生する"],
answers: [0],
expl:
`正解: コンパイルエラーになる

オーバーライドするメソッドは、親のメソッドが宣言したチェック例外より広い例外を追加できない。IOException の親である Exception への拡大は「広げる」方向なのでエラーになる。

・狭める（例: FileNotFoundException にする）・消すことは可能。非チェック例外はこの規則の対象外`,
verify: { file: "Main.java", compileError: true}});

// ================= 検証ハーネス =================
const { spawnSync} = require("child_process");
const os = require("os");

function tmpdir() { return fs.mkdtempSync(path.join(os.tmpdir(), "mock60-"));}

function javacFiles(dir, files) {
const list = [];
for (const [rel, content] of Object.entries(files)) {
const p = path.join(dir, rel);
fs.mkdirSync(path.dirname(p), { recursive: true});
fs.writeFileSync(p, content);
if (rel.endsWith(".java")) list.push(p);
}
return spawnSync(JAVAC, ["-d", dir,...list], { encoding: "utf8"});
}

function check(q) {
const v = q.verify;
if (v.snippets) {
v.snippets.forEach((sn, i) => {
const dir = tmpdir();
const src = "public class Main {\n public static void main(String[] args) {\n " + sn + "\n}\n}\n";
const r = javacFiles(dir, { "Main.java": src});
const ok = r.status === 0;
if (ok!== v.snippetOk[i]) throw new Error("選択肢" + i + " のコンパイル可否が想定と違う (ok=" + ok + ") " + (r.stderr || "").split("\n")[0]);
if (v.snippetAnswer === "error" ? !ok : ok) { if (!q.answers.includes(i)) throw new Error("コンパイル可否と answers が不一致 (選択肢" + i + ")"); } else if (q.answers.includes(i)) throw new Error("コンパイル可否と answers が不一致 (選択肢" + i + ")");
fs.rmSync(dir, { recursive: true, force: true});
});
return "snippets";
}
if (v.hierarchy) {
const dir = tmpdir();
const lines = v.hierarchy.map(c => " System.out.println(RuntimeException.class.isAssignableFrom(Class.forName(\"" + c + "\")));").join("\n");
const src = "public class Main {\n public static void main(String[] args) throws Exception {\n" + lines + "\n}\n}\n";
const c = javacFiles(dir, { "Main.java": src});
if (c.status!== 0) throw new Error("階層チェック用コードがコンパイルできない");
const r = spawnSync(JAVA, ["-cp", dir, "Main"], { encoding: "utf8"});
const trues = r.stdout.trim().split("\n").map((s, i) => s.trim() === "true"? i: -1).filter(i => i >= 0);
if (JSON.stringify(trues)!== JSON.stringify(q.answers)) throw new Error("非チェック例外の判定が answers と不一致: " + JSON.stringify(trues));
fs.rmSync(dir, { recursive: true, force: true});
return "hierarchy";
}
const dir = tmpdir();
const files = v.files || { [v.file]: q.code};
const c = javacFiles(dir, files);
if (v.compileError) {
if (c.status === 0) throw new Error("コンパイルエラーになるはずが成功した");
fs.rmSync(dir, { recursive: true, force: true});
return "compile-error confirmed";
}
if (c.status!== 0) throw new Error("コンパイルに失敗: " + (c.stderr || "").split("\n").slice(0, 3).join(" / "));
let r;
if (v.sourceMode) {
r = spawnSync(JAVA, [path.join(dir, v.file)], { encoding: "utf8"});
} else {
r = spawnSync(JAVA, ["-cp", dir,...v.run], { encoding: "utf8"});
}
const out = (r.stdout || "").trim();
const exp = (v.stdout || "").trim();
if (out!== exp) throw new Error("出力不一致: 実際=[" + out + "] 想定=[" + exp + "]");
if (v.exception) {
if (r.status === 0) throw new Error("例外 " + v.exception + " が発生しなかった");
if (!(r.stderr || "").includes(v.exception)) throw new Error("想定と違う例外: " + (r.stderr || "").split("\n")[0]);
} else if (r.status!== 0) {
throw new Error("実行時エラー: " + (r.stderr || "").split("\n")[0]);
}
fs.rmSync(dir, { recursive: true, force: true});
return "compile+run";
}

function verifyAll() {
let pass = 0, skip = 0; const fails = [];
for (const q of Q) {
if (!q.verify) { skip++; console.log("Q" + q.n + " [" + q.tag + "] SKIP (知識問題・機械検証なし)"); continue;}
try { const how = check(q); pass++; console.log("Q" + q.n + " [" + q.tag + "] OK (" + how + ")");}
catch (e) { fails.push("Q" + q.n + " [" + q.tag + "]: " + e.message); console.log("Q" + q.n + " [" + q.tag + "] FAIL: " + e.message);}
}
console.log("\n=== 検証結果: PASS " + pass + " / FAIL " + fails.length + " / SKIP " + skip + " ===");
const dist = {};
for (const q of Q) dist[q.tag] = (dist[q.tag] || 0) + 1;
console.log("細目別出題数:", JSON.stringify(dist));
console.log("合計:", Q.length);
if (fails.length) { console.log(fails.join("\n")); process.exitCode = 1;}
}

function emit() {
for (const q of Q) {
for (const f of ["code", "expl"]) {
const s = q[f];
if (s && (s.includes("`") || s.includes("${"))) throw new Error("Q" + q.n + " の " + f + " にテンプレートリテラルで危険な文字がある");
}
}
const lines = [];
lines.push("/* ============================================================");
lines.push(" Java SE 17 Programmer I（1Z0-825-JPN）本番形式 模試 第3セット（60問）");
lines.push(" 形式は java-silver-mock-exam.html の問題データと同一:");
lines.push(" {cat, text, code, choices, answers, expl} + tag（公式細目番号）");
lines.push(" answers: 正解の選択肢インデックス（0始まり）。複数 = 複数選択問題");
lines.push("");
lines.push(" ");
lines.push(" 1. このファイルの内容をアプリの <script> 内、QUESTIONS2 の後ろに貼る");
lines.push(" 2. ALL_QUESTIONS の定義に...QUESTIONS3 を追加する");
lines.push(" 3. セット選択（qset）に \"3\" を追加し、pool() で QUESTIONS3 を返すよう分岐を足す");
lines.push(" （現行アプリは qset が \"1\" / \"2\" / \"all\" の3択前提のため、そのままでは第3セット単独選択はできない）");
lines.push(" tag は追加フィールドで、アプリは未使用フィールドを無視するのでそのままで動作する");
lines.push(" ============================================================ */");
lines.push("const QUESTIONS3 = [");
for (const q of Q) {
lines.push("// Q" + q.n + " [" + q.tag + "]");
lines.push("{cat:" + JSON.stringify(q.cat) + ", tag:" + JSON.stringify(q.tag) + ", text:" + JSON.stringify(q.text) + ", code:");
lines.push(q.code === null? "null,": "`" + q.code + "`,");
lines.push("choices:" + JSON.stringify(q.choices) + ", answers:" + JSON.stringify(q.answers) + ",");
lines.push("expl:`" + q.expl + "`},");
lines.push("");
}
lines.push("];");
const out = process.env.OUT || (process.env.HOME + "/workspace/Java-Tracker/mock-questions-60.js");
fs.writeFileSync(out, lines.join("\n"));
console.log("wrote " + out + " (" + Q.length + " questions)");
}

if (require.main === module) {
const mode = process.argv[2];
if (mode === "verify") verifyAll();
else if (mode === "emit") emit();
else { console.log("usage: node gen-mock60.js [verify|emit]");}
}
