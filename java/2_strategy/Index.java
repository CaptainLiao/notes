public class Index {

  Double total = 0d;

  private void btnOk_click(object sender, EventArgs e) {
    Doble totalPrices = Double.parseDouble(txtPrice.Text) * Double.parseDouble(txtNum.Text);

    total = total + totalPrice;

    lbxList.Items.Add("单价：" + txtPrice.Text + "数量"
    + txtNum.Text + " 合计： " + totalPrices.ToString() );

    lblResult.Text = total.ToString();
  }
}