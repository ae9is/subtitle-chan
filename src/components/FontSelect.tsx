export interface FontSelectProps {
  name?: string
  id?: string
  onChange: () => void
  customFontName?: string
  customFontId?: string
  customFontOnInput: () => void
}

export default function FontSelect(props: FontSelectProps) {
  const { id, name, onChange, customFontId, customFontName, customFontOnInput } = props

  return (
    <>
      Font:
      <select name={name} id={id} onChange={onChange}>
        <option value="direct">[直接指定]</option>
        <option value="M PLUS\ 1p">M PLUS 1p</option>
        <option value="M PLUS Rounded\ 1c" selected>
          M PLUS Rounded 1c
        </option>
        <option value="Mamelon">マメロン</option>
        <option value="YasashisaB">やさしさB</option>
        <option value="HuiFont29">ふい字</option>
        <option value="Hachi Maru Pop">Hachi Maru Pop</option>
        <option value="MkPOP">851マカポップ</option>
        <option value="bananaslipplus">バナナスリップplus</option>
        <option value="katyou">花鳥風月</option>
        <option value="TanukiMagic">たぬき油性マジック</option>
        <option value="hakidame">吐き溜</option>
        <option value="umeboshi">梅干し</option>
        <option value="Jiyucho">じゆうちょう</option>
        <option value="HitmoR">Hitmo</option>
        <option value="nishikiteki">にしき的</option>
        <option value="Yusei Magic">Yusei Magic</option>
        <option value="Nikumaru">にくまる</option>
        <option value="KTEGAKI">kawaii手書き</option>
        <option value="JKGL">JK Gothic L</option>
        <option value="Reggae One">Reggae One</option>
        <option value="OhisamaFont">おひさま</option>
        <option value="nukamiso">ぬかみそ</option>
        <option value="genkai">源界明朝</option>
        <option value="CP">チェックポイント</option>
        <option value="Noto Sans JP">Noto Sans JP</option>
        <option value="Sawarabi Gothic">さわらびゴシック</option>
        <option value="Nico Moji">ニコモジ</option>
      </select>
      Font (custom):
      <input
        type="text"
        name={customFontName}
        id={customFontId}
        size={30}
        onInput={customFontOnInput}
        disabled
      />
      <br />
    </>
  )
}
