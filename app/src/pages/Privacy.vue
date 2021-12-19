<template>
  <div class="container">
    <section class="my-3">
      <h1 class="my-3">Privacy policy</h1>
      <div class="card">
        <div class="card-body">
          <div class="card-text">
            <p>
              If you require any more information or have any questions about
              our privacy policy, please feel free to contact us by email at our
              <router-link :to="{ name: 'contact' }">contact page</router-link>.
            </p>
            <p>
              We consider the privacy of our visitors and users very seriously.
              This document describes the types of personal information that are
              collected and recorded by using this service.
            </p>
            <h3>Log files</h3>
            <p>
              Like many other services, this service makes use of log files.
              These files merely logs visitors to the site - usually a standard
              procedure for hosting companies and a part of hosting services's
              analytics. The information inside the log files includes internet
              protocol (IP) addresses, browser type, Internet Service Provider
              (ISP), date/time stamp, referring/exit pages, and possibly the
              number of clicks. This information is used to analyze trends,
              administer the site, track user's movement around the site, and
              gather demographic information. IP addresses, and other such
              information are not linked to any information that is personally
              identifiable.
            </p>
            <h3>Cookies and Web Beacons</h3>
            <p>
              This website uses cookies to store information about visitors'
              preferences, to record user-specific information on which pages
              the site visitor accesses or visits, and to personalize or
              customize our web page content based upon visitors' browser type
              or other information that the visitor sends via their browser.
            </p>
            <h3>Third Party Privacy Policies</h3>
            <p>
              You should consult the respective privacy policies of these
              third-party ad servers for more detailed information on their
              practices as well as for instructions about how to opt-out of
              certain practices. This website's privacy policy does not apply
              to, and we cannot control the activities of, such other
              advertisers or web sites. These are the links to other privacy
              policies that cover the third-party-services we use:
            </p>
            <ul>
              <li>
                For ReCAPTCHA:
                <a href="https://policies.google.com/terms" target="_blank"
                  >Google's terms of service and policies</a
                >
              </li>
            </ul>
            If you wish to disable cookies, you may do so through your
            individual browser options. More detailed information about cookie
            management with specific web browsers can be found at the browsers'
            respective websites.
            <p></p>
            <h3>Children's Information</h3>
            <p>
              We believe it is important to provide added protection for
              children online. We encourage parents and guardians to spend time
              online with their children to observe, participate in and/or
              monitor and guide their online activity. This service does not
              knowingly collect any personally identifiable information from
              children under the age of 13. If a parent or guardian believes
              that we have in our database the personally-identifiable
              information of a child under the age of 13, please contact us
              immediately using our
              <router-link :to="{ name: 'contact' }">contact page</router-link>
              and we will use our best efforts to promptly remove such
              information from our records.
            </p>
            <h3>Online Privacy Policy Only</h3>
            <p>
              This privacy policy applies only to our online activities and is
              valid for visitors to our website and regarding information shared
              and/or collected there. This policy does not apply to any
              information collected offline or via channels other than this
              website.
            </p>
            <h3>Update</h3>
            <p>
              This Privacy Policy was last updated on: Saturday, March 16th,
              2019.
            </p>
            <p>
              <i
                >Should we update, amend or make any changes to our privacy
                policy, those changes will be posted here.</i
              >
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useActiveMeta } from 'vue-meta';

export default defineComponent({
  setup() {
    const meta = useActiveMeta();

    meta.title = 'Privacy policy';
  },
});
</script>
