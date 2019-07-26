<template>
  <div class="freight_body">
    <div class="left">
      <div id="cityList">
        <Card :bordered="true">
          <p slot="title">城市列表#</p>
          <Row>
            <Col span="8">
              <Card>
                <p slot="title">已开通城市</p>
                <city></city>
              </Card>
            </Col>
            <Col span="15" offset="1">
              <Card>
                <p slot="title">城市距离表</p>
                <cityDistance></cityDistance>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
      <div id="postage">
        <Card :bordered="true">
          <p slot="title">邮寄方式#</p>
          <postage></postage>
        </Card>
      </div>
      <div id="addCity">
        <Card :bordered="true">
          <p slot="title">城市开通#</p>
          <cityForm></cityForm>
        </Card>
      </div>
      <div id="cityLine">
        <Card :bordered="true">
          <p slot="title">开通路线#</p>
          <cityDistanceForm></cityDistanceForm>
        </Card>
      </div>
    </div>
    <div class="right">
      <Anchor show-ink>
        <AnchorLink href="#cityList" title="城市列表" />
        <AnchorLink href="#postage" title="邮寄方式" />
        <AnchorLink href="#addCity" title="城市开通" />
        <AnchorLink href="#cityLine" title="开通路线" />
      </Anchor>
    </div>
  </div>
</template>

<script>
import city from "./table/city";
import cityDistance from "./table/city_distance";
import cityForm from "./form/add_city";
import cityDistanceForm from "./form/add_city_distance";
import postage from "./form/postage";
export default {
  components: {
    city,
    cityDistance,
    cityForm,
    cityDistanceForm,
    postage
  }
};
</script>

<style scoped>
.freight_body {
  display: flex;
}
.left {
  width: 84%;
  padding-right: 1%;
  height: auto;
}

.left > div {
  padding-top: 2%;
}

.right {
  width: 15%;
  height: auto;
}
</style>
