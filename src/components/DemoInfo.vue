<template>
  <div class="demo-info">
    <p>
      Це демоверсія веб-сайту open-source продукту, який демонструє розроблений
      функціонал і всі останні можливості цього проекту. Складається з декількох модулів:
    </p>
    <ul>
      <li>
        <a
          :href="`${orgLink}/server`"
          target="_blank"
          rel="nofollow"
        >Server</a>
      </li>
      <li>
        <a
          :href="`${orgLink}/web`"
          target="_blank"
          rel="nofollow"
        >Web</a>
      </li>
      <li>
        <a
          :href="`${orgLink}/websocket`"
          target="_blank"
          rel="nofollow"
        >Websocket</a>
      </li>
    </ul>
    <p>
      Кожен модуль має останню версію з Github сховища та постійно оновлюється по мірі надходження нових даних
      (Pull Request на master гілку) за допомогою <a
        :href="`${orgLink}/autodeploy`"
        target="_blank"
        rel="nofollow"
      >Autodeploy</a> модуля.
    </p>
    <p>
      Цей проект ви можете поставити на власний сервер.
    </p>
    <ul>
      <li>
        <a
          :href="orgLink"
          target="_blank"
          rel="nofollow"
        >Github</a>
      </li>
      <li>
        <a
          href="https://docs.urepairpc.com"
          target="_blank"
          rel="nofollow"
        >Документація</a>
      </li>
    </ul>
    <p class="small">
      * дані оновлюються кожні 16 годин
    </p>
  </div>
</template>

<script>
const GITHUB_URL = 'https://github.com'
const GITHUB_ORG = 'urepairpc'

export default {
  computed: {
    orgLink() {
      return `${GITHUB_URL}/${GITHUB_ORG}`
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  a {
    display: block;
    text-align: center;
    padding: 5px 10px;
    min-width: 150px;
    margin: 10px 0;
    border: 1px dashed;
    &:hover {
      color: #333;
      border-style: solid;
    }
  }
}

.demo-wrap {
  max-width: 600px;
  margin: 30px auto 0;
  background: #fff;
  padding: 10px 20px;
  color: #6a7888;
  text-align: justify;
  border: 1px solid #ececec;
}

.small {
  font-size: .8rem;
  color: #8c8c8c;
}
</style>
