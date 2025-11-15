import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { NewlineToBrPipe } from '../../newline-to-br.pipe';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { searchResultItemType, searchResultItem } from '../../types/search-result-item';

@Component({
  selector: 'app-card',
  templateUrl: './search-result-item-card.component.html',
  styleUrls: ['./search-result-item-card.component.css'],
  standalone: true,
  imports: [FontAwesomeModule, NewlineToBrPipe, NgIf],
})
export class SearchResultItemCardComponent {
  constructor(private gtmService: GoogleTagManagerService) {}

  @Input() itemCategory = '' as searchResultItemType;
  @Input() item = {} as searchResultItem;
  @Input() openingHourLabel = '';
  @Input() buttonBgColor = '';
  @Input() searchEventName = '';
  @Input() telEventName = '';

  faMagnifyingGlass = faMagnifyingGlass;
  faPhone = faPhone;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  handleClickSearchButton(searchResultItem: searchResultItem) {
    const gtmTag = {
      event: this.searchEventName,
      data: {
        name: searchResultItem.name,
      },
    };
    this.gtmService.pushTag(gtmTag);
  }

  handleClickTelButton(searchResultItem: searchResultItem) {
    const gtmTag = {
      event: this.telEventName,
      data: {
        name: searchResultItem.name,
      },
    };
    this.gtmService.pushTag(gtmTag);
  }

  generateMapURI(address: string) {
    return `https://www.google.com/maps/search/?api=1&query=${address}`;
  }

  generateSearchURI(name: string, address: string) {
    return `https://www.google.com/search?q=${name} ${address}`;
  }

  generateTelURI(tel: string) {
    return `tel:${tel}`;
  }

  /**
   * 括弧付き電話番号をハイフン区切り形式に変換する
   * 例: (03)1234-5678 → 03-1234-5678（先頭に括弧）
   *     (090)1234-5678 → 090-1234-5678（先頭に括弧）
   *     （03）1234-5678 → 03-1234-5678（全角括弧にも対応）
   *     03(1234)5678 → 03-1234-5678（中間に括弧）
   *     03（1234）5678 → 03-1234-5678（中間に全角括弧）
   *     03−1234−5678 → 03-1234-5678（マイナス記号にも対応）
   *     03ー1234ー5678 → 03-1234-5678（長音記号にも対応）
   *     03-1234-5678（担当:田中） → 03-1234-5678（末尾の括弧付き文字列を削除）
   *
   * @param tel 電話番号文字列
   * @returns ハイフン区切り形式の電話番号
   */
  normalizePhoneNumber(tel: string): string {
    if (!tel) {
      return '';
    }

    // 末尾の括弧で囲われた文字列を削除（半角・全角両対応）
    // パターン: 末尾に (xxx) または （xxx） がある場合、それを削除
    const normalized = tel.replace(/[(（][^)）]*[)）]\s*$/g, '').trim();

    // 括弧付き形式を検出（半角・全角・マイナス記号・長音記号対応）
    // パターン1: (0XX)XXXX-XXXX または （0XX）XXXX－XXXX（先頭に括弧）
    const headParenPattern = /[(（](0\d{1,4})[)）][-－−ー\s]?(\d{1,4})[-－−ー\s]?(\d{3,4})/;
    const headMatch = normalized.match(headParenPattern);

    if (headMatch) {
      // 括弧を取り除いてハイフン区切りに変換
      const areaCode = headMatch[1]; // 市外局番（例: 03, 090）
      const middlePart = headMatch[2]; // 中間部分
      const lastPart = headMatch[3]; // 末尾部分

      return `${areaCode}-${middlePart}-${lastPart}`;
    }

    // パターン2: 0XX(XXXX)XXXX または 0XX（XXXX）XXXX（中間に括弧）
    const middleParenPattern = /(0\d{1,4})[-－−ー\s]?[(（](\d{1,4})[)）][-－−ー\s]?(\d{3,4})/;
    const middleMatch = normalized.match(middleParenPattern);

    if (middleMatch) {
      // 括弧を取り除いてハイフン区切りに変換
      const firstPart = middleMatch[1]; // 最初の部分（例: 03, 090）
      const middlePart = middleMatch[2]; // 中間部分
      const lastPart = middleMatch[3]; // 末尾部分

      return `${firstPart}-${middlePart}-${lastPart}`;
    }

    // 括弧なしの場合は正規化された文字列を返す
    return normalized;
  }

  /**
   * 文字列からハイフン区切りの電話番号を抽出する
   * 前後に不要な文字列がある場合は除去して電話番号のみを返す
   * 括弧付き形式は自動的にハイフン区切りに変換される
   *
   * 対応する電話番号形式:
   * - 固定電話: 0X-XXXX-XXXX, 0XX-XXX-XXXX, 0XXX-XX-XXXX など
   * - 携帯電話: 090-XXXX-XXXX, 080-XXXX-XXXX, 070-XXXX-XXXX
   * - フリーダイヤル: 0120-XXX-XXX, 0800-XXX-XXXX
   * - 括弧付き: (03)1234-5678 → 03-1234-5678 に変換
   * - 半角ハイフン（-）、全角ハイフン（－）、マイナス記号（−）、長音記号（ー）すべてに対応
   *
   * @param tel 電話番号を含む文字列
   * @returns 抽出された電話番号、見つからない場合は空文字
   */
  extractPhoneNumber(tel: string): string {
    if (!tel || tel.trim() === '') {
      return '';
    }

    // まず括弧付き形式を正規化
    const normalized = this.normalizePhoneNumber(tel);
    // console.log(normalized);
    // 日本の電話番号パターンを検索（半角ハイフン、全角ハイフン、マイナス記号、長音記号対応）
    const phonePattern = /^0[-－−ー\s]?(\d{1,4})[-－−ー\s]?(\d{1,4})[-－−ー\s]?(\d{3,4})$/;
    const match = normalized.match(phonePattern);
    // console.log(match);

    if (!match) {
      return '';
    }

    const extractedNumber = match[0];

    // 全角ハイフン、マイナス記号、長音記号を半角ハイフンに変換
    const normalizedNumber = extractedNumber.replace(/[－−ー]/g, '-');

    // 抽出した電話番号の桁数チェック（半角ハイフン、全角ハイフン、マイナス記号、長音記号を除去）
    const digitsOnly = normalizedNumber.replace(/[-－−ー]/g, '');

    // 10桁未満は無効
    if (digitsOnly.length < 10) {
      return '';
    }

    // 11桁の場合、IP電話or携帯電話番号orフリーダイヤル（050, 090, 080, 070, 060, 0800）のみ許可
    if (digitsOnly.length === 11) {
      const isMobilePhone = /^(050|090|080|070|060|0800)/.test(digitsOnly);
      if (!isMobilePhone) {
        return '';
      }
    }

    // 12桁以上は無効
    if (digitsOnly.length > 11) {
      return '';
    }

    return normalizedNumber;
  }

  /**
   * 表示用の電話番号を取得する
   * 電話番号が抽出できない場合はエラーメッセージを返す
   * @param tel 電話番号文字列
   * @returns 表示用の電話番号またはエラーメッセージ
   */
  getDisplayPhoneNumber(tel: string): string {
    const phoneNumber = this.extractPhoneNumber(tel);
    return phoneNumber || '正しい電話番号を取得できませんでした';
  }

  /**
   * 電話番号が有効かチェックする
   * @param tel 電話番号文字列
   * @returns 有効な場合true
   */
  hasValidPhoneNumber(tel: string): boolean {
    return this.extractPhoneNumber(tel) !== '';
  }
}
